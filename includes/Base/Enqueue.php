<?php 

/**
* Trigger this file on Plugin uninstall
*
* 
*/

namespace Includes\Base;

use \Includes\Base\BaseController;

class Enqueue extends BaseController{

	public function register() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueueAdmin'));
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueuePage'));
		


		// add_action( 'wp_enqueue_scripts', array( $this,'editor_plugin_register_scripts' ));
		// add_action( 'elementor/editor/before_enqueue_scripts', array( $this,'editor_plugin_enqueue_scripts' ));


	}

/* 	public function editor_plugin_register_scripts(){
		wp_register_script( 'react-script',  $this->plugin_url . 'build/index.js', array( 'wp-element' ), '1.0.0');
		wp_register_style( 'react-css', $this->plugin_url . '/build/index.css' );
		wp_register_style( 'react-index-css', $this->plugin_url . '/build/style-index.css' );
	} */
	public function editor_plugin_enqueue_scripts(){
		  // Register the scripts
		//   wp_enqueue_script( 'admin-script', $this->plugin_url . 'assets/scripts/pluginAdminScripts.js', array( 'jquery' ), '1.0.0', true );

	}

	public function enqueueAdmin(){
		// enqueue all our scripts
		// wp_enqueue_style( 'mypluginstyle-admin', $this->plugin_url . '', __FILE__ );
		wp_enqueue_script( 'react-script', $this->plugin_url . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
		wp_localize_script( 'react-script', 'react_ajax_object',
			array( 
				
				'ajax_react' => admin_url('admin-ajax.php'),
				'ajax_react_nonce' => wp_create_nonce("ajax_react_nonce"),
				'get_post_id_react' => get_the_ID(),
				'get_site_url_react' => get_site_url(),
				
			)
		);

		
		wp_enqueue_style( 'react-css', $this->plugin_url . '/build/index.css', 99 );
		wp_enqueue_style( 'react-index-css', $this->plugin_url . '/build/style-index.css', 99 );
	}

	public function enqueuePage(){
		// http://wordpress.test/wp-content/uploads/guesty-data/guesty-listing
	   
	   wp_enqueue_script( 'react-script', $this->plugin_url . 'build/index.js', array( 'wp-element' ), '1.0.0', true );
		wp_localize_script( 'react-script', 'react_ajax_object',
			array( 
				
				'ajax_react' => admin_url('admin-ajax.php'),
				'ajax_react_nonce' => wp_create_nonce("ajax_react_nonce"),
				'get_post_id_react' => get_the_ID(),
				'get_site_url_react' => get_site_url(),
				
			)
		);

		wp_enqueue_style( 'react-css', $this->plugin_url . '/build/index.css', 99 );
		wp_enqueue_style( 'react-index-css', $this->plugin_url . '/build/style-index.css', 99 );

		wp_enqueue_style( 'mypluginstyle-page', $this->plugin_url . '/assets/css/pluginStyleSheet.css', 99 );
		
	
		
	}


}