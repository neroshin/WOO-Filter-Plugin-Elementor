<?php 

/**
* 
*
*
*/

namespace Includes\Base;

use \Includes\Base\BaseController;
use WP_REST_Response;
use \Includes\Utilities\WooHelper;
use WP_Query;

class GetRequest extends BaseController{

	function register() {
		/* add_action( 'rest_api_init', function () {
			register_rest_route( 'myplugin/v1', '/author', array(
			  'methods' => 'GET',
			  'callback' =>[$this ,  'my_awesome_func'],
			) );
		  } ); */


		  add_action('rest_api_init', function () {

			// $post_types = get_post_types(array('public' => true), 'objects');

			// print_r($post_types);
			register_rest_route( 'woofilter/v1', '/products', array(
			  'methods' => 'GET',
			  'callback' =>[$this ,  'get_all_wc_products'],
			//   'permission_callback' => [$this , 'midleware_access_token']
				
			) );

			

			register_rest_route( 'woofilter/v1', 'products/category/(?P<id>\d+)', array(
				'methods' => 'GET',
				'callback' =>[$this ,  'get_category'],
				'args' => array(
					'id' => array(
					  'validate_callback' => function($param, $request, $key) {
						return is_numeric( $param );
					  }
					),
				),
			  //   'permission_callback' => [$this , 'midleware_access_token']
				  
			  ) );
			/* foreach ($post_types as $post_type) {
				egister_rest_route('wordpman/v1', '/'.  $post_type->name , array(
					'methods' => 'GET',
					'callback' => array($this, 'get_single_post_type_callback'),
					'args' => array(
						'post_type' => array(
							'default' => $post_type
						)
					),
					'permission_callback' =>  [$this , 'midleware_access_token']
				)); 


				register_rest_route('wordpman/v1', '/' . $post_type->name . '/(?P<id>\d+)', array(
					'methods' => 'GET',
					'callback' => array($this, 'get_single_post_callback'),
					'args' => array(
						'id' => array(
							'validate_callback' => function($param, $request, $key) {
								return is_numeric($param);
							}
						),
						'post_type' => array(
							'default' => $post_type->name
						)
					),
					'permission_callback' =>  [$this , 'midleware_access_token']
				)); 

				register_rest_route('wordpman/v1', '/' . $post_type->name . '/all', array(
					'methods' => 'GET',
					'callback' => array($this, 'get_all_post_callback'),
					'args' => array(
						'post_type' => array(
							'default' => $post_type->name
						)
					),
					'permission_callback' =>  [$this , 'midleware_access_token']
				));
			}*/
			
		  } );


		  add_action("wp_ajax_get_attr_terms", [$this , "get_attr_terms"]);
		  add_action("wp_ajax_nopriv_get_attr_terms", [$this , "get_attr_terms"]);

	}

	function get_attr_terms() {
	
		$taxonomy = $_REQUEST['taxonomy'];

		$attr_terms = get_terms([
			'taxonomy'   => $taxonomy,
			'hide_empty' => false, // Set to true if you only want terms assigned to products
		]);

		// print_r($attr_terms);

		$response = new WP_REST_Response(["type"=>"success" , "data"=> $attr_terms ], 200);
	
	
		echo json_encode($response->data );
		exit;
	}
	function get_category( $data ) {

		if($data['id'] === "0")return [];

		$term_id =  $data['id'];
		$taxonomy = 'product_cat';
		$term = get_term_by('id', $term_id, $taxonomy);

		$thumb_id = get_term_meta( $term->term_id, 'thumbnail_id', true );
		// print_r($term);
		$term->image_url = wp_get_attachment_url( $thumb_id );
		
		return $term;
	  }
	function get_all_wc_products($request) {
		$page = $request->get_param('page') ? (int) $request->get_param('page') : 1;
		$per_page = $request->get_param('per_page') ? (int) $request->get_param('per_page') : 10;
	
		$product_Category_id = $request->get_param('category_id') ? (int) $request->get_param('category_id') : null;
		$product_MinPrice = $request->get_param('minPrice') ? (int) $request->get_param('minPrice') : null;
		$product_MaxPrice = $request->get_param('maxPrice') ? (int) $request->get_param('maxPrice') : null;
		$product_Attr = $request->get_param('attributes') ?  $request->get_param('attributes') : null;
		$product_Rating = $request->get_param('stars') ?  $request->get_param('stars') : null;
		$product_Search = $request->get_param('s') ?  $request->get_param('s') : "";
		$product_tag_id = $request->get_param('tag_id') ?  $request->get_param('tag_id') : null;

		$wooHelper = new WooHelper();

		// print_r($request->get_param('attribute'));
		$args = [
			'status' => 'publish',
			'post_type' => 'product',
			// 'posts_per_page' => -1
			'posts_per_page' => $per_page,
			'paged' => $page, 
			'tax_query' => [],
			'meta_query' => [],
			's'              => $product_Search , // Replace with your search query
			/* 'tax_query'      => array(
					'relation' => 'AND', // Categories must match ALL selected categories

					// Categories (AND condition)
					array(
						'taxonomy' => 'product_cat', // WooCommerce Product Categories
						'field'    => 'term_id',
						'terms'    => 40, // Replace with selected category IDs
						'operator' => 'AND',
					),

					// Attributes (OR condition)
					array(
						'relation' => 'OR', // Attributes can match ANY selected attribute

						array(
							'taxonomy' => 'pa_brand', // Example: Product attribute "Brand"
							'field'    => 'term_id',
							'terms'    => array(29), // Replace with selected attribute term IDs
							'operator' => 'IN',
						),
						array(
							'taxonomy' => 'pa_size', // Example: Product attribute "Color"
							'field'    => 'term_id',
							'terms'    => array(36), // Replace with selected attribute term IDs
							'operator' => 'IN',
						),
					),
				), */
			
		];

		$pagination_args = [
			'status' => 'publish',
			'post_type' => 'product',
			 'posts_per_page' => -1,
			 'tax_query' => [],
			'meta_query' => [],
			's'              => $product_Search , // Replace with your search query
		];


		if($product_tag_id  !== null && $product_tag_id !== 0){
			$product_tag = array(
					'relation' => 'AND', 
					array(
						'taxonomy'         => 'product_tag',
						'field'            => 'term_id',
						'terms'            => $product_tag_id,
						'include_children' => true, // Set to true if you want to include child categories
				)
			);
			
			$args['tax_query']  = array_merge($product_tag, $args['tax_query']);
				



			$pagination_args['tax_query'][]  = array_merge($product_tag, $args['tax_query']);
		}

		if($product_Category_id !== null && $product_Category_id !== 0){
	
			$product_cat = array(
					'relation' => 'AND', 
					array(
						'taxonomy'         => 'product_cat',
						'field'            => 'term_id',
						'terms'            => $product_Category_id,
						'include_children' => true, // Set to true if you want to include child categories
				)
			);
			
			$args['tax_query']  = array_merge($product_cat, $args['tax_query']);
				

			$pagination_args['tax_query'][]  = array_merge($product_cat, $args['tax_query']);
			
		}

		
		/*  print_r($args);
		exit; 
 */
		 if($product_MinPrice !== null ){
			$priceRange = 
				array(
					'key'     => '_price',
					'value'   => [$product_MinPrice , $product_MaxPrice??1000], // Set your desired price range
					'compare' => 'BETWEEN',
					'type'    => 'NUMERIC',
				);

			$args['meta_query'] = array_merge($priceRange, $args['meta_query']);
			$args['orderby'] = '_price';
			$args['order'] =  'ASC';


			$pagination_args['meta_query'] = array_merge($priceRange, $args['meta_query']);
			$pagination_args['orderby'] = '_price';
			$pagination_args['order'] =  'ASC';


		
		}

		if($product_MaxPrice !== null ){
			$priceRange =  
				array(
					'key'     => '_price',
					'value'   => [$product_MinPrice??0 , $product_MaxPrice], // Set your desired price range
					'compare' => 'BETWEEN',
					'type'    => 'NUMERIC',
				);

			$args['meta_query'] = array_merge($priceRange, $args['meta_query']);
			$args['orderby'] = '_price';
			$args['order'] =  'ASC';

			$pagination_args['meta_query'] = array_merge($priceRange, $args['meta_query']);
			$pagination_args['orderby'] = '_price';
			$pagination_args['order'] =  'ASC';
		} 


		
		 if($product_Attr  !== null){
			

			$product_Attr = json_decode($product_Attr , true);
			
			$product_AttrFil = $wooHelper->formatAttributeArray($product_Attr);
			
			
			if(!empty($product_AttrFil)){
				// print_r($product_AttrFil );
				$product_AttrFil['relation'] = 'OR';


				$args['tax_query'][] =  array_merge($product_AttrFil, $args['tax_query']);


				$pagination_args['tax_query'] = array_merge($product_AttrFil, $args['tax_query']);
			}
			// print_r($args);
			/* $priceRange =   array(
				array(
					'taxonomy' => 'pa_color', // Replace with your attribute taxonomy (e.g., pa_size, pa_brand)
					'field'    => 'term_id',  // Use term ID for filtering
					'terms'    => array(12, 15), // Replace with your attribute term IDs
					'operator' => 'IN' // Use 'IN' to match any of the provided terms
				),
			); 
  */
/*   echo "fasdgasd";*/
			// exit; 

		} 

		if($product_Rating  !== null  ){
			

			/* 'value'   => 2, // Change this value to filter by rating
					'compare' => '>=', */


			$arrRating = json_decode($product_Rating , false);

			if(!is_array($arrRating))$arrRating = json_decode($arrRating , false);
			// $arrRating = json_decode($arrRating , false);
			// print_r($arrRating );

			// echo $arrRating;
			
				
 
				if(!empty($arrRating)){

					$arrRating = array(
						array(
							'key'     => '_wc_average_rating',
							'value'   => min($arrRating), // Use the array directly
							'compare' => '>=',   // Matches any of the given values
							'type'    => 'NUMERIC',
						),
					);
					
					$arrRating['relation'] = 'OR';
					$args['meta_query'] =  array_merge($arrRating, $args['meta_query']);
					$pagination_args['meta_query']= array_merge($arrRating, $args['meta_query']);
				} 
			
				
		}
		
		/* 'tax_query'      => array(
				array(
					'taxonomy' => 'pa_color', // Replace with your attribute taxonomy (e.g., pa_size, pa_brand)
					'field'    => 'term_id',  // Use term ID for filtering
					'terms'    => array(12, 15), // Replace with your attribute term IDs
					'operator' => 'IN' // Use 'IN' to match any of the provided terms
				),
			), */
		
		


		$products = get_posts($args);
		// $products = wc_get_products($args);
		/*  echo "<pre>";
		print_r($products );
		exit;  */
 
		$total_products = get_posts($pagination_args);
		
		/* print_r($total_products);
		exit; */
		$total_pages = ceil(count($total_products) / $per_page);
		
		$product_array = [];
		
		foreach ($products as $product) {
			// print_r($product);

			$productInfo = wc_get_product( $product->ID );
			$product_array[] = [
				'id' => $product->ID,
				 'name' => $product->post_title,
				 'price' => $productInfo->get_price(),
				'regular_price' => $productInfo->get_regular_price(),
				'sale_price' => $productInfo->get_sale_price(),
				'description' => $productInfo->get_description(),
				'short_description' => $productInfo->get_short_description(),
				'sku' => $productInfo->get_sku(),
				'stock_status' => $productInfo->get_stock_status(),
				'categories' => $productInfo->get_categories(),
				'image' => wp_get_attachment_url($productInfo->get_image_id()),
				'is_product_variation' => $productInfo->is_type( 'variable' ),
				'permalink' => $productInfo->get_permalink(), 
				'variations' => wc_get_product($product->ID)->get_attributes(), 
			];
		} 
	
		$response = new WP_REST_Response($product_array, 200);
		$response->header('X-WP-Total', count($total_products));
		$response->header('X-WP-TotalPages', $total_pages);
	
		return $response;
	}

	function midleware_access_token() {

			// print_r($_SERVER);

	/* 	if (isset($_SERVER['HTTP_ORIGIN'])) {
			$client_domain = parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
			$server_domain = $_SERVER['SERVER_NAME'];
	
			// Check if client and server domains match
			if ($client_domain !== $server_domain) {
				header('HTTP/1.1 403 Forbidden');
				echo json_encode(['error' => 'Forbidden. Domains do not match.']);
				exit;
			}
		} */

		if (preg_match('/Bearer\s(\S+)/', $_SERVER['HTTP_AUTHORIZATION'], $matches)) {
			$bearer  =$matches[1];
			// print_r($matches[1]);
			// exit;
			$date =  date('Y-m-d H:i:s');
			
			global $wpdb;
			$table_name = $wpdb->prefix . 'roauth_oauth_access_tokens';
			$select_token = $wpdb->get_row(
				"SELECT * FROM  $table_name WHERE `access_token` = '{$bearer}' AND `expires_at` >= '{$date}';" ,
			OBJECT);

			if($select_token === null){
				header('HTTP/1.1 401 Unauthorized');
				echo json_encode(['error' => 'Unauthorized. Invalid or missing Bearer Token.']);
				exit;
			}
			return true; // Adjust this based on your needs 
		}

		return false; 
	}
	public function get_all_post_callback($request) {
		
		$post_type = $request->get_param('post_type');

		$post = get_posts([
			'post_type' => $post_type ,
			'posts_per_page' => 999999,
		]);
		if (!$post || $post[0]?->post_type !== $post_type) {
			return new WP_Error('post_not_found', 'Post not found', array('status' => 404));
		}

		$post_data = array_map( [$this , 'prepare_post_data'] , $post) ;

		return new WP_REST_Response($post_data, 200);
	}
	/* public function get_single_post_callback($request) {
		$post_id = $request->get_param('id');
		$post_type = $request->get_param('post_type');

		$post = get_post($post_id);

		if (!$post || $post->post_type !== $post_type) {
			return new WP_Error('post_not_found', 'Post not found', array('status' => 404));
		}

		$post_data = $this->prepare_post_data($post);

		return new WP_REST_Response($post_data, 200);
	}
	private function prepare_post_data($post) {
		
			$post_data = array(
				'id' => $post->ID,
				'title' => $post->post_title,
				'content' => $post->post_content,
				'excerpt' => $post->post_excerpt,
				'slug' => $post->post_name,
				'date' => $post->post_date,
				'modified' => $post->post_modified,
				'status' => $post->post_status,
				'type' => $post->post_type,
				'link' => get_permalink($post->ID),
			);

			// Add featured image if available
			if (has_post_thumbnail($post->ID)) {
				$post_data['featured_image'] = get_the_post_thumbnail_url($post->ID, 'full');
			}

			// Add custom fields
			$custom_fields = get_post_custom($post->ID);
			$post_data['custom_fields'] = array();
			foreach ($custom_fields as $key => $values) {
				if (substr($key, 0, 1) !== '_') { // Exclude hidden fields
					$post_data['custom_fields'][$key] = $values[0];
				}
			}

			return $post_data;
	}
	public function get_single_post_type_callback($request) {
		$post_type = $request->get_param('post_type');
		// print_r($post_type);
      
        return new WP_REST_Response($post_type, 200);
    }

	function get_routes_post_type() {
		$post_types = get_post_types(array('public' => true), 'objects');
		return new WP_REST_Response($post_types, 200);
	}
	function my_awesome_func() {

		header('Content-Type: text/html; charset=UTF-8');
		global $getThisTemplates;

		ob_start();
		
	
		include($getThisTemplates['login.template']);
		
		$output = ob_get_clean();
		
		
		
		header("HTTP/1.1 405 Method Not Allowed");
		echo $output;

	} */
}