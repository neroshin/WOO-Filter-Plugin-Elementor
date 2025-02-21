<?php 
/**
* @package Wordpress React
*/
/*
Plugin Name: WOO Filter Plugin Elementor
Plugin URI: 
Description: 
Version: 1.0.0
Author: Nero
Author URI : 
*/


if ( ! defined( 'ABSPATH' ) ) {
	exit; 
}

// Definitions
define ( 'WOOFIL_PLUGIN_VERSION', '1.0.0');
define ( 'WOOFIL_PLUGIN_PATH' , plugin_dir_path( __FILE__ ) );
define ( 'WOOFIL_PLUGIN_URL' , plugin_dir_url( __FILE__ ) ); 



if ( file_exists( dirname( __FILE__ ) . '/vendor/autoload.php' ) ){
	require_once dirname( __FILE__ ) . '/vendor/autoload.php';
}


function activate_wordpress_react_plugin(){
	Includes\Base\Activate::activate();
}
register_activation_hook( __FILE__, 'activate_wordpress_react_plugin' );

// Initialize Deactivation, The code that runs during plugin deactivation
function deactivate_wordpress_react_plugin(){
	Includes\Base\Deactivate::deactivate();
}
register_deactivation_hook( __FILE__, 'deactivate_wordpress_react_plugin' );


// Include the Init folder, Initialize all the core classes of the plugin
if ( class_exists( 'Includes\\Init' ) ) {
	global $getThisTemplates;
	
	Includes\Init::load_template();
	Includes\Init::register_services();
}
