<?php

namespace Adu42\Cropper;

trait CropTrait
{
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
runCropper($("input{$this->getElementClassSelector()}"));
SCRIPT;
    }

}
