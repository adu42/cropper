<?php

namespace Igwen6w\Cropper;

use Encore\Admin\Form\Field\Image;

class Crop extends Image
{
    use CropTrait;

    private $aspect_ration = 1.777778;

    protected static $css = [
        '/vendor/igwen6w/cropper/cropperjs-1.5.13/dist/cropper.min.css',
    ];

    protected static $js = [
        '/vendor/igwen6w/cropper/cropperjs-1.5.13/dist/cropper.min.js',
        '/vendor/igwen6w/cropper/main.js',
    ];

}
