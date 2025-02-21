
<div
 class="react-widget<?php echo (isset($_GET['action']) && $_GET['action'] === "elementor") ? " editor":""?>" 
 data-widget-title="<?php echo esc_attr($settings['widget_title']); ?>"
 data-repeater-setting="<?php echo esc_attr(json_encode($settings['filter_repeat_setting'])); ?>"
 data-is-target-html-setting="<?php echo esc_attr(json_encode(['is_custom_element_target' => $settings['is_custom_element_target']??"" , 'element_id' => $settings['element_id']??"" ])); ?>"
 data-variation-popup="<?php echo esc_attr($settings['is_variation_popup']); ?>"
 >
</div>

<?php 
/* echo "<pre>";
print_r($settings); */
// exit;
?>



