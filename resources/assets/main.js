function runCropper(el){
    el.on('filezoomshown', function (event, params) {
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
            let actions = $(elem).find("div.kv-zoom-actions").first();
            if (actions.length) {
                if (actions.find('button#btn-encore-cropper').length) {
                    return;
                }
                // 裁剪按钮
                let btnCrop = $("<button id='btn-encore-cropper' type='button' class='kv-file-zoom btn btn-sm btn-kv btn-default btn-outline-secondary'"+
                    " title='Cortar la imagen'><span class='glyphicon glyphicon-scissors'></span></button>");
                btnCrop.on("click", function(event) {
                    if ($(this).attr('disable')) {return;}
                    $(this).attr('disable', true);
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
                                // let name = (el[0].files.length) ? el[0].files[0].name : "img.png";
                                let name = (el[0].files.length) ? img.attr('title') : "img.png";
                                let file = new File(
                                    [blobFile],
                                    name,
                                    {
                                        type: "image/png",
                                        lastModified: new Date().getTime()
                                    }
                                );
                                let container = new DataTransfer();
                                for (let i=0; i<el[0].files.length; i++) {
                                    if (el[0].files[i].name === name) {
                                        // 将剪裁的结果添加到容器中
                                        container.items.add(file);
                                    } else {
                                        // 若不是当前剪裁的图片，直接将原图添加到容器中
                                        container.items.add(el[0].files[i]);
                                    }
                                }
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
                        +"<label for='modal-footer-crop-aspect-ration'>自定义：</label> "
                        +"<input class='form-control' id='modal-footer-crop-aspect-ration' type='number' value='1.7777778'"
                        +" title='例如：16:9 等于 1.7777778'"
                        +" placeholder='例如：16:9 等于 1.7777778 '/>"
                        +"</div>"
                    );
                    let btnSetAspectRation = $("<button type='button' class='margin kv-file-zoom btn btn-kv btn-default btn-outline-secondary'"+
                        " title='设置'><span class='glyphicon glyphicon-ok'></span></button>");
                    // 设置纵横比动作
                    btnSetAspectRation.on('click', function (event) {
                        cropper.destroy();
                        options['aspectRatio'] = $('input#modal-footer-crop-aspect-ration').val();
                        cropper = new Cropper(img[0], options);
                    });
                    let setAspectRation = function (aspect_ration) {
                        cropper.destroy();
                        options['aspectRatio'] = aspect_ration;
                        cropper = new Cropper(img[0], options);
                    }
                    // 表单 添加 纵横比输入框
                    modalFooterForm.append(cropAspectRation);
                    // 表单添加 设置纵横比按钮
                    modalFooterForm.append(btnSetAspectRation);
                    // 表单按钮  2:1
                    let btnSetAspectRation_2 = $("<button data-toggle='tooltip' type='button'" +
                        " class=' kv-file-zoom btn btn-kv btn-default btn-outline-secondary'"+
                        " title='2:1'>2:1</button>");
                    btnSetAspectRation_2.on('click', function (event) {
                        setAspectRation(2);
                    });
                    modalFooterForm.append(btnSetAspectRation_2);
                    // 表单按钮  16:5
                    let btnSetAspectRation_16_5 = $("<button data-toggle='tooltip' type='button'" +
                        " class=' kv-file-zoom btn btn-kv btn-default btn-outline-secondary'"+
                        " title='16:5'>16:5</button>");
                    btnSetAspectRation_16_5.on('click', function (event) {
                        setAspectRation(16/5);
                    });
                    modalFooterForm.append(btnSetAspectRation_16_5);
                    // 表单按钮  3:2
                    let btnSetAspectRation_3_2 = $("<button data-toggle='tooltip' type='button' " +
                        " class=' kv-file-zoom btn btn-kv btn-default btn-outline-secondary'"+
                        " title='3:2'>3:2</button>");
                    btnSetAspectRation_3_2.on('click', function (event) {
                        setAspectRation(3/2);
                    });
                    modalFooterForm.append(btnSetAspectRation_3_2);
                    // 表单按钮  15:7
                    let btnSetAspectRation_15_7 = $("<button data-toggle='tooltip' type='button'" +
                        " class=' kv-file-zoom btn btn-kv btn-default btn-outline-secondary'"+
                        " title='15:7'>15:7</button>");
                    btnSetAspectRation_15_7.on('click', function (event) {
                        setAspectRation(15/7);
                    });
                    modalFooterForm.append(btnSetAspectRation_15_7);

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
