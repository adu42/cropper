<?php

namespace Igwen6w\Cropper;

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

        if ($views = $extension->views()) {
            $this->loadViewsFrom($views, 'igwen6w-cropper');
        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes(
                [$assets => public_path('vendor/igwen6w/cropper')],
                'igwen6w-cropper'
            );
            $this->publishes([
                __DIR__.'/../resources/lang' => resource_path('lang')
            ], 'igwen6w-cropper-lang');
        }

        Admin::booting(function () {
            Form::extend('cropper', Crop::class);
        });
    }
}