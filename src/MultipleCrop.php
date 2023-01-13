<?php

namespace Igwen6w\Cropper;

use Encore\Admin\Form\Field\MultipleImage;
use Illuminate\Support\Arr;

class MultipleCrop extends MultipleImage
{
    use CropTrait;

    protected $aspect_ration = 1.777778;

    protected static $css = [
        '/vendor/igwen6w/cropper/cropperjs-1.5.13/dist/cropper.min.css',
        '/vendor/igwen6w/cropper/main.css',
    ];

    protected static $js = [
        '/vendor/igwen6w/bootstrap-fileinput/js/fileinput.min.js',
        '/vendor/igwen6w/cropper/cropperjs-1.5.13/dist/cropper.min.js',
        '/vendor/igwen6w/cropper/main.js',
    ];


    /**
     * {@inheritdoc}
     */
    public function getValidator(array $input)
    {
        if (request()->has(static::FILE_DELETE_FLAG)) {
            return false;
        }

        if ($this->validator) {
            return $this->validator->call($this, $input);
        }

        $attributes = [];

        if (!$fieldRules = $this->getRules()) {
            return false;
        }

        $attributes[$this->column] = $this->label;

        $value = Arr::get($input, $this->column, []);

        list($rules, $input) = $this->hydrateFiles(is_string($value) ? [] : $value);

        return \validator($input, $rules, $this->getValidationMessages(), $attributes);
    }

}
