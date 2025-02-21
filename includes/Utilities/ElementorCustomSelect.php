<?php 


namespace Includes\Utilities;

use Elementor\Base_Data_Control;
use Elementor\Controls_Manager;

class ElementorCustomSelect extends Base_Data_Control {

    public function get_type() {
        return 'custom_select';
    }

    public function enqueue() {

     //   wp_enqueue_script( 'custom-select2-control' );


       
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
        <select id="custom-select2" class="elementor-control-tag-area" data-setting="{{ data.name }}">
            <# _.each( data.options , function( key ,  value ) {
                const parts = value.split('_');
                #>
                <option value="{{ value }}" {{ value === data.controlValue ? "selected" : "" }}>{{ key }}</option>
            <# }); #>
        </select>
       
        <?php
    }
}
?>