<?php

namespace Encore\Cropper;

use Encore\Admin\Form\Field\Image;

class Crop extends Image
{
    use CropTrait;

    private $aspect_ration = 1.777778;

    protected static $css = [
        '/vendor/encore/cropper/cropperjs-1.5.13/dist/cropper.min.css',
    ];

    protected static $js = [
        '/vendor/encore/bootstrap-fileinput/js/fileinput.min.js',
        '/vendor/encore/cropper/cropperjs-1.5.13/dist/cropper.min.js',
        '/vendor/encore/cropper/main.js',
    ];

}
