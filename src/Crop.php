<?php

namespace Adu42\Cropper;

use Encore\Admin\Form\Field\Image;

class Crop extends Image
{
    use CropTrait;

    private $aspect_ration = 1.777778;

    protected static $css = [
        '/vendor/adu42/cropper/cropperjs-1.5.13/dist/cropper.min.css',
    ];

    protected static $js = [
        '/vendor/adu42/bootstrap-fileinput/js/fileinput.min.js',
        '/vendor/adu42/cropper/cropperjs-1.5.13/dist/cropper.min.js',
        '/vendor/adu42/cropper/main.js',
    ];

}
