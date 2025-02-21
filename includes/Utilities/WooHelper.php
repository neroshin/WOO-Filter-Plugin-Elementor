<?php
namespace Includes\Utilities;

use WooCommerce;

class WooHelper{
    public  function __construct() {
        
        // echo "fasdfasdg";
        if ( ! class_exists( 'WooCommerce' ) ) {
            echo "fasdgasd";
            return;
        }
    }

    public function getProductCategories(){
        $product_categories = get_terms( 'product_cat' );
        /* echo "<pre>";
        print_r( $product_categories);
        exit; */
        $product_categories =  array_reduce($product_categories,  function($carry, $item){
            $parent_name = "";
           

            if($item->parent !== 0){
                $parent = get_term( $item->parent, 'product_cat' );
                $parent_name = "/".$parent->name;
            }
			$carry[$item->term_id."_".preg_replace('/\s+/', '_', $item->name).$parent_name ]  = esc_html__( $item->name.$parent_name , 'textdomain' );
			return $carry ;
        });
        $product_categories[0] = esc_html__( "All", 'textdomain' );
        return $product_categories;
    }

    public function getProductTags(){
        $terms_tags = get_terms( 'product_tag' );

       /*  print_r($terms_tags );
        exit; */
        $terms_tags =  array_reduce($terms_tags,  function($carry, $item){
			
            
            /*  $taxonomy = 'pa_' . $item->attribute_name;
 
             // Get terms associated with this attribute taxonomy
             $attr_terms = get_terms([
                 'taxonomy'   => $taxonomy,
                 'hide_empty' => false, // Set to true if you only want terms assigned to products
             ]);
         
             print_r($attr_terms);  *///
 
             $carry[$item->term_id."_".preg_replace('/\s+/', '_', $item->name) ]  = esc_html__( $item->name , 'textdomain' );
             return $carry ;
         });
         $terms_tags[0] = esc_html__( "All", 'textdomain' );
         return $terms_tags;
    }
    public function getProductAttributes(){
        
        global $wpdb;

        $attribute_taxonomies = $wpdb->get_results( "SELECT * FROM " . $wpdb->prefix . "woocommerce_attribute_taxonomies WHERE attribute_name != '' ORDER BY attribute_name ASC;" );
        set_transient( 'wc_attribute_taxonomies', $attribute_taxonomies );
        // echo "<pre>";
        // $attribute_taxonomies = array_filter( $attribute_taxonomies  ) ;
        // print_r($attribute_taxonomies);
        $attribute_taxonomies =  array_reduce($attribute_taxonomies,  function($carry, $item){
			
            
           /*  $taxonomy = 'pa_' . $item->attribute_name;

            // Get terms associated with this attribute taxonomy
            $attr_terms = get_terms([
                'taxonomy'   => $taxonomy,
                'hide_empty' => false, // Set to true if you only want terms assigned to products
            ]);
        
            print_r($attr_terms);  *///

            $carry['pa_'.$item->attribute_name]  = esc_html__( $item->attribute_label, 'textdomain' );
            return $carry ;
        });

       
        // print_r($attribute_taxonomies);
        // $attribute_taxonomies['barn_owl'] = "Owl";
        return $attribute_taxonomies;
        // exit;
    }
    function formatAttributeArray($attributes) {
		// $groupedArray = array();

		// Group terms by taxonomy
					
		$tax_query = null;

		foreach ($attributes as $taxonomy => $terms) {
			if (!empty($terms)) {
				$term_ids = array_map(function ($term) {
					return $term['term_id'];
				}, $terms);

				$tax_query[] = array(
					'taxonomy' => $taxonomy,
					'field'    => 'term_id',
					'terms'    => $term_ids,
					'operator' => 'IN',
				);
			}
		}

		return $tax_query;
	}
}