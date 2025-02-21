<?php 


namespace Includes\Utilities;

use Elementor\Base_Data_Control;
use Elementor\Controls_Manager;

class ElementorCustomMultiSelect extends Base_Data_Control {

    public function get_type() {
        return 'custom_multiselect';
    }

    public function enqueue() {
        wp_enqueue_script('select2-js', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js', ['jquery'], null, true);
        wp_enqueue_style('select2-css', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css', [], null);
        wp_enqueue_style('pluginStyleSheet-css', WOOFIL_PLUGIN_URL. '/assets/css/pluginStyleSheet.css', [], null);
       
       
        wp_enqueue_script('custom-select2-control', WOOFIL_PLUGIN_URL. '/assets/scripts/pluginAdminScripts.js', ['jquery', 'select2-js'], null, true);
        wp_localize_script( 'custom-select2-control', 'WOOFILAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' )));        

        wp_enqueue_script( 'custom-select2-control' );


       
    }

    protected function get_default_settings() {
        return [
            'multiple' => false,
            'options'  => [],
        ];
    }

    public function content_template() {
        ?>
        <label for="custom-select2">{{{ data.label }}}</label>

        {{  console.log(data , "custom-select2") }}
        <select id="custom-select2" class="elementor-control-tag-area" data-setting="{{ data.name }}" multiple style=" height: 70px;">
            <# _.each( data.controlValue , function(  value ) {
                const parts = value.split('_');
                #>
                <option value="{{ value }}" selected>{{ (parts?.[1]) }}</option>
            <# }); #>
        </select>
       
        <?php
    }
}
?>