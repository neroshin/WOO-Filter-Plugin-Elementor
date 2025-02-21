<?php 

/**
* Trigger this file on Plugin uninstall
*
* 
*/

namespace Includes\Base;

use \Includes\Base\BaseController;
use  \Includes\Widgets\WooAjaxFilterElementor;
use  \Includes\Utilities\ElementorCustomMultiSelect;
use  \Includes\Utilities\ElementorCustomSelect;

class ElementorWidget extends BaseController{

	public function register() {

		add_action( 'elementor/widgets/register', [$this , 'register_hello_world_widget'] );
		/* add_action('elementor/frontend/after_enqueue_styles', [$this, 'widget_styles']);
        add_action('elementor/frontend/after_register_scripts', [$this, 'widget_scripts']); */
		add_action('elementor/controls/register',[$this , 'register_controls_elem']);
		
		
	}

	
	public function register_controls_elem($controls_manager) {
		$controls_manager->register(new ElementorCustomSelect());
		$controls_manager->register(new ElementorCustomMultiSelect());
	}
	

	public function widget_styles() {
       /*  wp_register_style('react-widget', plugins_url('assets/css/hello-world-react-widget.css', __FILE__));
        wp_enqueue_style('react-widget'); */
		// wp_enqueue_style( 'react-css', WPREACT_PLUGIN_URL . '/build/index.css', 99 ); 
    }

    public function widget_scripts() {
        // wp_register_script('react-widget', plugins_url('assets/js/react-widget.js', __FILE__), ['react', 'react-dom'], self::VERSION, true);
        // wp_register_script('react-widget-frontend', plugins_url('assets/js/react-widget-frontend.js', __FILE__), ['react-widget'], self::VERSION, true);
		
	/* 	wp_enqueue_script( 'react-script', WPREACT_PLUGIN_URL . 'build/index.js',  ['react', 'react-dom'], '1.0.0', true );
		wp_localize_script( 'react-script', 'react_ajax_object',
			array( 
				
				'ajax_react' => admin_url('admin-ajax.php'),
				'ajax_react_nonce' => wp_create_nonce("ajax_react_nonce"),
				'get_post_id_react' => get_the_ID(),
				'get_site_url_react' => get_site_url(),
				
			)
		); */
	}
	function register_hello_world_widget( $widgets_manager ) {

		$widgets_manager->register( new WooAjaxFilterElementor() );
	
	}



}