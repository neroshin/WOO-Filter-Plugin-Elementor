<?php 

/**
* 
*
*
*/

namespace Includes\Base;
use WP_REST_Response;
use \Includes\Base\BaseController;
use \Includes\Utilities\WooHelper;
use WP_Query;
class PostRequest extends BaseController{

	function register() {
		 if(isset($_POST)){
			/* add_action( 'admin_post_action_leave_message', array($this , 'exmaple') );
			add_action( 'admin_post_nopriv_action_leave_message', array($this , 'exmaple') ); */
			add_action('rest_api_init', function () {
				register_rest_route( 'woofilter/v1', '/product/variations', array(
					'methods' => 'POST',
					'callback' =>[$this ,  'get_wc_products_variations'],
				  //   'permission_callback' => [$this , 'midleware_access_token']
					  
				) );

			  } );
		 }

	}
	
	function get_wc_products_variations($request) {
		$id = $request->get_param('id') ? (int) $request->get_param('id') : 0;
		// echo $id;


		$product    = wc_get_product( $id );
		$variations = $product->get_available_variations();

		
		// $variation_attributes = $product->get_variation_attributes();

	/* 	echo "<pre>";
		print_r($variation_attributes);

exit; */
		$variation_options = [];
    	$product_variations = [];

		foreach ($variations as $item) {
			$attributes = $item['attributes'];
			/* $color = $attributes['attribute_pa_color'] ?? "";
			$size = $attributes['attribute_pa_size'] ?? ""; */
			/* 
			if ($color && !in_array($color, $color_options)) {
				$color_options[] = $color;
			}
			
			if ($size && !in_array($size, $size_options)) {
				$size_options[] = $size;
			}
			 */
			$condition = [];
			foreach (wc_get_product($item['variation_id'])->get_attributes() as $name => $value) {
				$name = ucfirst(str_replace('pa_', '', $name));
				$variation_options[$name][] = $value;
				$condition[$name]=  $value;
			} 
			// print_r($condition );
			$product_variations[] = [
				"id" => $item['variation_id'],
				"title" => get_the_title($item['variation_id']),
				"permalink" => get_permalink( $item['variation_id']),
				"attributes" => $condition,
				"price" => floatval($item['display_price']),
				"regular_price" => floatval($item['display_regular_price']),
				"dimensions" => $item['dimensions'],
				"image_url" => $item['image']['full_src'],
				"image_id" => $item['image_id'],
				"is_in_stock" => (bool) $item['is_in_stock'],
				"is_purchasable" => (bool) $item['is_purchasable'],
				"max_qty" => $item['max_qty'] ?? 0,
				"min_qty" => $item['min_qty'] ?? 1,
				"weight" => $item['weight'] ?? "",
				"is_virtual" => (bool) $item['is_virtual'],
				"variation_description" => $item['variation_description'] ?? "",
			];
		}

		// print_r($product_variations);
		
		// Remove duplicates & format output
		$formatted_attributes = array_map(function($options, $name){
			// print_r($options);
			$options = array_filter($options);
			// print_r(array_values(array_unique($options)));
			return ['name' => $name, 'options' => array_values(array_unique($options))];
		}, $variation_options, array_keys($variation_options));


		$variations_respond = [
			"name" => $product->get_name(),
			"description" => $product->get_description(),
			"price" => $product->get_price(),
			"stock_status" => $product->get_stock_status(),
			"average_rating" => $product->get_average_rating(),
			"image_url" => wp_get_attachment_url($product->get_image_id()),
			"variation_option" => $formatted_attributes,
			 "product_variation" => $product_variations
			];
		$response = new WP_REST_Response($variations_respond, 200);
		
		return $response; 
		



/* 
		$args = [
			'post_type'      => 'product_variation',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'post_parent'    => $id,
		];

		$attribute_options = [];
		$product_variations = [];
		$variations_respond = [];

		foreach (get_posts($args) as $variation) {

			print_r($variation);
			$price = get_post_meta($variation_id, '_price', true);

			$condition = [];
			// print_r(wc_get_product($variation->ID)->get_attributes()); 
				foreach (wc_get_product($variation->ID)->get_attributes() as $name => $value) {
					$name = ucfirst(str_replace('pa_', '', $name));
					$attribute_options[$name][] = $value;
					$condition[]=  $value;
				}
			print_r($condition);

			$product_variations[] = array(
				"id" => $variation->ID,
				"title" => $variation->post_title,
				"post_content" => $variation->post_title,
				'permalink' => get_permalink($variation->ID), 
				"title" => $variation->post_title,
				
			);
		}

		// Remove duplicates & format output
		$formatted_attributes = array_map(function($options, $name){
			// print_r($options);
			$options = array_filter($options);
			// print_r(array_values(array_unique($options)));
			return ['name' => $name, 'options' => array_values(array_unique($options))];
		}, $attribute_options, array_keys($attribute_options));


		$variations_respond["variation_option"] = $formatted_attributes;
		$variations_respond["product_variation"] = $product_variations;


		  $variations_option = [];

		foreach ($variations as $variation) {

			$variation_id = $variation->ID;
			print_r($variation);
		
			$attributes = wc_get_product($variation_id)->get_attributes();
			foreach ($attributes as $attribute_name => $attribute_value) {
				echo str_replace('pa_', '', $attribute_name)."_".$attribute_value;
				// echo ucfirst(str_replace('pa_', '', $attribute_name)) . ': ' . $attribute_value . '<br>';
			}

			$variations_option[] = array(
				name: "Size",
				options: ["S", "M", "L", "XL"],
			); 
		
			
		} 
		 $response = new WP_REST_Response($variations_respond, 200);
		
		return $response;  */
	}
	
	function exmaple() {
		
	}

}