function runCropper(el){
    el.on('filezoomshow', function (event, params) {
        let current_modal = params.modal;
        let elem = params.modal[0];
        let preview_thumbnails_ele = document.getElementById(params.previewId);
        let zoom_cache_ele = document.getElementById('zoom-'+params.previewId);
        let cropper;
        let aspect_ration = el.data('aspect-ration');
        let options = {
            aspectRatio: aspect_ration,
            viewMode: 2,
        };
        if (elem) {
            let img = $(elem).find("img.file-preview-image").first();
            // var bttns = $(elem).find("div.file-footer-buttons").first();
            let actions = $(elem).find("div.kv-zoom-actions").first();
            if (actions.length) {
                // 裁剪按钮
                let btnCrop = $("<button type='button' class='kv-file-zoom btn btn-sm btn-kv btn-default btn-outline-secondary'"+
                    " title='Cortar la imagen'><span class='glyphicon glyphicon-scissors'></span></button>");
                btnCrop.on("click", function(event) {
                    cropper = new Cropper(img[0], options);
                    let modalFooter = $("<div class='modal-footer'></div>");
                    // 添加完成裁剪按钮
                    let btnCropDone = $("<button type='button' class='kv-file-zoom btn btn-kv btn-default btn-outline-secondary'"+
                        " title='save'><span class='glyphicon glyphicon-saved'></span></button>");
                    // 保存剪裁动作
                    btnCropDone.on('click', function (event) {
                        // 获取裁剪资源
                        let cropperImg = cropper.getCroppedCanvas().toDataURL("image/png");
                        fetch(cropperImg).then(function(res) {
                            res.blob().then(function(blobFile) {
                                let blobUrl = URL.createObjectURL(blobFile);
                                // 更新所有图片 blob 资源地址
                                img.attr("src", blobUrl);
                                $(preview_thumbnails_ele).find('img.file-preview-image').attr('src', blobUrl);
                                $(zoom_cache_ele).find('img.file-preview-image').attr('src', blobUrl);
                                // 更新 input
                                let name = (el[0].files.length) ? el[0].files[0].name : "img.png";
                                let file = new File(
                                    [blobFile],
                                    name,
                                    {
                                        type: "image/png",
                                        lastModified: new Date().getTime()
                                    }
                                );
                                let container = new DataTransfer();
                                container.items.add(file);
                                el[0].files = container.files;
                                el[0].dispatchEvent(new Event("change", { "bubbles": true }));
                            });
                        });
                        //销毁剪裁器实例
                        cropper.destroy();
                        // 关闭 modal
                        current_modal.modal('hide');
                    });
                    let modalFooterForm = $("<form class=\"form-inline\"></form>");
                    // 添加设置纵横比按钮
                    let cropAspectRation = $(
                        "<div class='form-group'>"
                        +"<label for='modal-footer-crop-aspect-ration'>纵横比</label> "
                        +"<input class='form-control' id='modal-footer-crop-aspect-ration' type='number' value='1.7777778' placeholder='例如：16:9 等于 1.7777778 '/>"
                        +"</div>"
                    );
                    let btnSetAspectRation = $("<button type='button' class='margin kv-file-zoom btn btn-kv btn-default btn-outline-secondary'"+
                        " title='set aspect ration'><span class='glyphicon glyphicon-ok'></span></button>");
                    // 设置纵横比动作
                    btnSetAspectRation.on('click', function (event) {
                        cropper.destroy();
                        options['aspectRatio'] = $('input#modal-footer-crop-aspect-ration').val();
                        cropper = new Cropper(img[0], options);
                    });
                    // 表单 添加 纵横比输入框
                    modalFooterForm.append(cropAspectRation);
                    // 表单添加 设置纵横比按钮
                    modalFooterForm.append(btnSetAspectRation);
                    // 重置剪裁
                    let btnCropReset = $("<button type='button' class='kv-file-zoom btn btn-kv btn-default btn-outline-secondary'"+
                        " title='reset'><span class='glyphicon glyphicon-refresh'></span></button>");
                    btnCropReset.on('click',function (event) {
                        cropper.reset();
                    });
                    // 添加表单
                    modalFooter.append(modalFooterForm);
                    // 添加 重置按钮
                    modalFooter.append(btnCropReset);
                    // 添加 保存按钮
                    modalFooter.append(btnCropDone);
                    $(elem).find("div.modal-content").append(modalFooter);
                });
                actions.prepend(btnCrop);
            }
        }
    });
}
