<?php
namespace Includes\Widgets;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use \Includes\Utilities\WooHelper;
// use \Includes\Base\BaseController

class WooAjaxFilterElementor extends Widget_Base{

	public function get_name() {
		return 'hello_world_widget_1';
	}

	public function get_title() {
		return esc_html__( 'Qualification Debt Form', 'elementor-addon' );
	}

	public function get_icon() {
		return 'eicon-code';
	}

	public function get_categories() {
		return [ 'basic' ];
	}
	protected function _register_controls() {

		$wooHelper = new WooHelper();
		

		

	// $terms =  $wooHelper->getProductTags( );
	// 	print_r($terms);
	// 	exit; 

        $this->start_controls_section(
            'content_section_title',
            [
                'label' => __('Content', 'my-elementor-react-widget'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'widget_title',
            [
                'label' => __('Widget Title', 'my-elementor-react-widget'),
                'type' => Controls_Manager::TEXT,
                'default' => __('React Widget', 'my-elementor-react-widget'),
            ]
        );
  /* 'label' => esc_html__( 'Show Image', 'textdomain' ),
						'type' => \Elementor\Controls_Manager::SWITCHER,
						'label_on' => esc_html__( 'Show', 'textdomain' ),
						'label_off' => esc_html__( 'Hide', 'textdomain' ),
						'return_value' => 'yes',
						'default' => 'yes',
						 */
		$this->add_control(
			'is_variation_popup',
			[
				'label' => esc_html__( 'Variation Popup ', 'textdomain' ),
				'type' => \Elementor\Controls_Manager::SWITCHER,
				'label_on' => esc_html__( 'Show', 'textdomain' ),
				'label_off' => esc_html__( 'Hide', 'textdomain' ),
				'return_value' => 'yes',
				'default' => 'yes',
			]
		);
        $this->end_controls_section();


		$this->start_controls_section(
			'content_section_filter_type',
			[
				'label' => esc_html__( 'Filters', 'textdomain' ),
				'tab' => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'filter_repeat_setting',
			[
				'label' => esc_html__( 'Repeater List', 'textdomain' ),
				'type' => Controls_Manager::REPEATER,
				'fields' => [
					[
						'name' => 'filter_title',
						'label' => esc_html__( 'Title', 'textdomain' ),
						'type' => Controls_Manager::TEXT,
						'default' => esc_html__( 'List Title' , 'textdomain' ),
						'label_block' => true,
					],
					[
						'name' => 'filter_type',
						'label' => esc_html__( 'Type', 'textdomain' ),
						'type' => Controls_Manager::SELECT,
						'default' => 'categories',
						'options' => [
							// '' => esc_html__( 'Default', 'textdomain' ),
							// '' => esc_html__( 'None', 'textdomain' ),
							'categories'  => esc_html__( 'Categories', 'textdomain' ),
							'pricing'  => esc_html__( 'Price', 'textdomain' ),
							'attributes'  => esc_html__( 'Attributes', 'textdomain' ),
							 'ratings' => esc_html__( 'Ratings', 'textdomain' ),
							 'search' => esc_html__( 'Search', 'textdomain' ),
							 'tags' => esc_html__( 'Tags', 'textdomain' ),
							/*'dotted' => esc_html__( 'Dotted', 'textdomain' ),
							'double' => esc_html__( 'Double', 'textdomain' ), */
						],
						'selectors' => [
							'{{WRAPPER}} .your-class' => 'border-style: {{VALUE}};',
						],
					],
					/* [
						'name' => 'list_content',
						'label' => esc_html__( 'Content', 'textdomain' ),
						'type' => Controls_Manager::WYSIWYG,
						'default' => esc_html__( 'List Content' , 'textdomain' ),
						'show_label' => false,
					], */
					[
						'name' => 'category_listing',
						'label' => esc_html__( 'Select Categories', 'textdomain' ),
						'type' => Controls_Manager::SELECT2,
						'label_block' => true,
						'multiple' => true,
						'options' =>  $wooHelper->getProductCategories(),
						'default' => [],
						'condition' => [
							'filter_type' => 'categories',
						],
					],
					[
						'name' => 'category_style',
						'label' => esc_html__( 'Style', 'textdomain' ),
						'type' => \Elementor\Controls_Manager::SELECT,
						'default' => 'categories',
						'options' => [
							'list'  => esc_html__( 'List', 'textdomain' ),
							'grid'  => esc_html__( 'Grid', 'textdomain' ),
						],
						'selectors' => [
							'{{WRAPPER}} .your-class' => 'border-style: {{VALUE}};',
						],
						'condition' => [
							'filter_type' => 'categories',
						],
					],
					[
						'name' => 'category_image',
						'label' => esc_html__( 'Show Image', 'textdomain' ),
						'type' => \Elementor\Controls_Manager::SWITCHER,
						'label_on' => esc_html__( 'Show', 'textdomain' ),
						'label_off' => esc_html__( 'Hide', 'textdomain' ),
						'return_value' => 'yes',
						'default' => 'yes',
						'condition' => [
							'filter_type' => 'categories',
						],
					],
					[
						'name' => 'attr_listing',
						'label' => esc_html__( 'Select Attributes', 'textdomain' ),
						'type' => Controls_Manager::SELECT,
						'label_block' => true,
						'multiple' => true,
						'options' =>  $wooHelper->getProductAttributes(),
						'default' => [],
						'condition' => [
							'filter_type' => 'attributes',
						],
					],
					[
						'name' => 'tags_listing',
						'label' => esc_html__( 'Select Tags', 'textdomain' ),
						'type' => Controls_Manager::SELECT2,
						'label_block' => true,
						'multiple' => true,
						'options' =>  $wooHelper->getProductTags(),
						'default' => [],
						'condition' => [
							'filter_type' => 'tags',
						],
					],
					[
						'name' => 'tag_default_Selected',
						'label' => esc_html__( 'Select Defualt', 'textdomain' ),
						'type' => Controls_Manager::SELECT,
						'label_block' => true,
						'multiple' => false,
						'options' =>  $wooHelper->getProductTags(),
						'default' => [],
						'condition' => [
							'filter_type' => 'tags',
						],
					],
					[
						'name' => 'term_listing',
						'label' => esc_html__( 'Select Term', 'textdomain' ),
						'type' =>  "custom_multiselect",
						'label_block' => true,
						'multiple' => true,
						'options' => "",
						'default' => [],
						'condition' => [
							'filter_type' => 'attributes',
						],
					]
				],
				'default' => [
					[
						'filter_title' => esc_html__( 'Title #1', 'textdomain' ),
						// 'list_content' => esc_html__( 'Item content. Click the edit button to change this text.', 'textdomain' ),
					]
				],
				'title_field' => '{{{ filter_title }}}',
			]
		);

		$this->end_controls_section();



		$this->start_controls_section(
            'target_html_content',
            [
                'label' => __('Target HTML Display', 'my-plugin'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        // Main select control
        $this->add_control(
            'is_custom_element_target',
			[
				'label' => esc_html__( 'Target HTML Product', 'textdomain' ),
				'type' => Controls_Manager::SELECT,
				'default' => 'no',
				'options' => [
					'yes'  => esc_html__( 'Yes', 'textdomain' ),
					'no'  => esc_html__( 'No', 'textdomain' ),
				],
				'selectors' => [
					'{{WRAPPER}} .your-class' => 'border-style: {{VALUE}};',
				],
			]
        );


        $this->add_control(
            'element_id',
            [
                'label' => __('Element ID', 'my-plugin'),
                'type' => Controls_Manager::TEXT,
                'default' =>"",
                'placeholder' =>"#ID",
                'condition' => [
                    'is_custom_element_target' => 'yes',
                ],
            ]
        );

        $this->end_controls_section();
		// Style Tab Start

		/* $this->start_controls_section(
			'section_title_style',
			[
				'label' => esc_html__( 'Title', 'elementor-addon' ),
				'tab' => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'title_color',
			[
				'label' => esc_html__( 'Text Color', 'elementor-addon' ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hello-world' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_section(); */
    }
	public function get_keywords() {
		return [ 'hello', 'world' ];
	}

	
    protected function render() {

		global $getThisTemplates;
        $settings = $this->get_settings_for_display();
		/* echo "<pre>";
		print_r( $settings); */
		include($getThisTemplates['page.template']);
       /*  ?>
        <div class="react-widget" data-widget-title="<?php echo esc_attr($settings['widget_title']); ?>">fas</div>
        <?php */
        wp_enqueue_script('react-widget-frontend');
    }
 




	/* protected function content_template(): void {
		?>
		
		<p class="hello-world">
			{{ settings.title }}
		</p>
		<?php
	} */
}