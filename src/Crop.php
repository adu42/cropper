<?php

namespace Igwen6w\Cropper;

use Encore\Admin\Form\Field\Image;

class Crop extends Image
{   
    private $aspect_ration = 1.777778;

    protected static $css = [
        '/vendor/igwen6w/cropper/cropperjs-1.5.13/dist/cropper.min.css',
    ];

    protected static $js = [
        '/vendor/igwen6w/cropper/cropperjs-1.5.13/dist/cropper.min.js',
        '/vendor/igwen6w/cropper/main.js',
    ];

    public function aspectRation($aspect_ration)
    {
        if (!empty($aspect_ration) && is_numeric($aspect_ration) && $aspect_ration > 0) {
            $this->attributes['data-aspect-ration'] = $aspect_ration;
        } else {
            $this->attributes['data-aspect-ration'] = $this->aspect_ration;
        }
        return $this;
    }

    protected function setupScripts($options)
    {
        parent::setupScripts($options);
        $this->script .= <<<SCRIPT
let el = $("input{$this->getElementClassSelector()}");runCropper(el);
SCRIPT;
    }

}
