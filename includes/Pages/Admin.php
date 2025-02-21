<?php 

/**
* Trigger this file on Plugin uninstall
*
* @package 
*/

namespace Includes\Pages;

use \Includes\Base\BaseController;

class Admin extends BaseController {

	public function register() {
		add_action( 'admin_menu', array( $this, 'add_admin_pages' ) );
		

		add_action('init', array($this, 'save_setting'));

	}

	public function add_admin_pages() {
	//	add_menu_page( 'Bidi Recyle', 'Bidi Recyle', 'manage_options', 'program', array( $this, 'admin_index' ), 'dashicons-admin-tools', 110 );
	
		// add_submenu_page();
	
	}
	public function save_setting(){
		// require admin template
		
		

	}
	/* public function mt_settings_page(){
		// require admin template
		

	} */

}