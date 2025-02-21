<?php 

/**
* Trigger this file on Plugin uninstall
*
*
*/

namespace Includes\Base;

use \Includes\Base\BaseController;
use BoxyBird\Inertia\Inertia;

class Shortcode extends BaseController{

	function register() {
		add_shortcode( 'shortcode_question_answer', array( $this , 'template' ) );
		/* add_shortcode( 'shortcode_locations ', array( $this , 'locations ' ) ); */
		
		}

	
	function template($atts){
	
		$settings = shortcode_atts( array(
			'widget_title' => ""
		), $atts );

		// print_r($attributes);
		global $getThisTemplates;
		
		ob_start();
		
		include($getThisTemplates['page.template']);
		
		$output = ob_get_clean();
		
		return $output; 
	}
}