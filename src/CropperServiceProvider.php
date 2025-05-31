<?php

namespace Encore\Cropper;

use Encore\Admin\Admin;
use Encore\Admin\Form;
use Illuminate\Support\ServiceProvider;

class CropperServiceProvider extends ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function boot(Cropper $extension)
    {
        if (! Cropper::boot()) {
            return ;
        }

//        if ($views = $extension->views()) {
//            $this->loadViewsFrom($views, 'encore-cropper');
//        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes(
                [$assets => public_path('vendor/encore/cropper')],
                'encore-cropper'
            );
//            $this->publishes([
//                __DIR__.'/../resources/lang' => resource_path('lang')
//            ], 'encore-cropper-lang');
        }

        Admin::booting(function () {
            Form::extend('cropper', Crop::class);
            Form::extend('multipleCropper', MultipleCrop::class);
        });
    }
}
