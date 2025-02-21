(function ($) {


  $(document).ready(function ($) {
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if ($(mutation.target).find(".elementor-repeater-fields").length > 0) {
                
                const elementorrepeater = $(mutation.target).find(".elementor-repeater-row-item-title");
                console.log(elementorrepeater, "Repeater field updated!");

                // Unbind previous event to avoid duplicates, then rebind
                elementorrepeater.off("click").on("click", async function () {
                    console.log('Div was clicked New Value!');


                    const elemmain = $(this);
                    const repeaterField = $(this).parents(".elementor-repeater-fields");

                    const terms = repeaterField.find('[data-setting="term_listing"]').val();
                    const taxonomy = repeaterField.find('[data-setting="attr_listing"]').val();

                    repeaterField.find('[data-setting="term_listing"]').prop("disabled" , true);
                    // Prevent duplicate AJAX requests
                    if (repeaterField.data("ajax-sent")) return;
                    repeaterField.data("ajax-sent", true);

                    // Prepare options
                    const append_data = (terms || []).map(value => {
                        const parts = value.split('_');
                        return new Option(parts?.[1], value, true, true);
                    });

                    if (append_data.find(i => i === "0_all") !== undefined) {
                        append_data.unshift(new Option("All", "0_all", false, false));
                    }

                    // AJAX request with debouncing
                    setTimeout(() => {
                        jQuery.ajax({
                            type: "POST",
                            dataType: "json",
                            url: WOOFILAjax.ajaxurl,
                            data: { action: "get_attr_terms", taxonomy: taxonomy },
                            success: function (response) {
                                if (response.type === "success") {
                                    // console.log(response);
                                    const append_res = (response.data)?.reduce((carry , item)=>{

                                     
                                      const findIsExist = append_data.find(i =>  jQuery(i).text() === item.name);
                                      
                                      if(!findIsExist){
                                       carry.push(new Option(item.name , item.term_id + "_" + item.name , false, false))
                                        return  carry;
                                         
                                      }

                                     return carry;
                                    } , [])

                                    // console.log(append_data.concat(append_res) , "append_resappend_resappend_res");
                                    // console.log(append_data);
                                    repeaterField.find('[data-setting="term_listing"]').html(append_data.concat(append_res));
                                    repeaterField.find('[data-setting="term_listing"]').prop("disabled" , false);
                                } else {
                                    console.error("Your vote could not be added");
                                }
                            },
                            complete: function () {
                                // Reset flag after request is done
                                repeaterField.removeData("ajax-sent");
                            }
                        });
                    }, 300); // Adjust debounce delay as needed
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});



  $(document).ready(function(){
    // Code here below  
    console.log("adfasdf")


    $('body').on('change', '[data-setting="attr_listing"]' , function() {


          const taxonomy = $(this).val();
          const elem = $(this);
          $(elem).parents(".elementor-repeater-row-controls").find('[data-setting="term_listing"]').prop("disabled" , true);
          jQuery.ajax({
              type : "post",
              dataType : "json",
              url : WOOFILAjax.ajaxurl,
              data : {action: "get_attr_terms", taxonomy : taxonomy},
              success: function(response) {
                if(response.type == "success") {
                    // jQuery("#vote_counter").html(response.vote_count)

                    var data = {};
                  console.log(response);

                    const append_data = (response.data).map((item)=>{
                      return new Option(item.name , item.term_id + "_" + item.name , false, false)
                    })
                    // append_data.unshift(new Option("All" ,   "0_all" , false, false));
                    // console.log(append_data);
                 /*  var newOption = new Option(data.text, data.id, false, false);*/
                  $(elem).parents(".elementor-repeater-row-controls").find('[data-setting="term_listing"]').html(append_data); 
                  $(elem).parents(".elementor-repeater-row-controls").find('[data-setting="term_listing"]').prop("disabled" , false);
                }
                else {
                    console.error("Your vote could not be added")
                }
              }
          })   
    })


/* 
    const elementorrepeater = document.querySelectorAll('.elementor-repeater-fields');
      elementorrepeater.forEach(elem => {
            elem.addEventListener('click', function() {
              // specify the action to take when the div is clicked
              console.log('Div was clicked!');
            });
        })

    document.addEventListener("DOMContentLoaded", function () {
      const elementorrepeater = document.querySelectorAll('.elementor-repeater-fields');
      elementorrepeater.forEach(elem => {
            elem.addEventListener('click', function() {
              // specify the action to take when the div is clicked
              console.log('Div was clicked!');
            });
        })
    }) */
    
    elementor.hooks.addAction( 'panel/open_editor/widget/hello_world_widget_1', function( panel, model, view ) { 

   /*    console.log(panel);
      console.log(model);
      console.log(view); */
      
      var $element = view.$el.find( '[data-setting="attr_listing"]' );
      // console.log($element , "elementelement");
      // setTimeout(doSomething, 6000);

      function doSomething() {
        console.log(document.querySelectorAll('.elementor-repeater-fields'));
        //do whatever you want here
        const elementorrepeater = document.querySelectorAll('.elementor-repeater-fields');
        elementorrepeater.forEach(elem => {
              elem.addEventListener('click', async function() {
                // specify the action to take when the div is clicked
                 console.log('Div was clicked!');
               /* console.log($('.editable [data-setting="attr_listing"]').val()); */

                // await jQuery('[data-setting="attr_listing"]').trigger("change");
                
                const elem = $('.editable [data-setting="attr_listing"]');
                const taxonomy = $('.editable [data-setting="attr_listing"]').val();
                const terms = $('.editable [data-setting="term_listing"]').val();
               /*  console.log(elem);
                console.log(taxonomy);
                console.log(terms , "termsterms"); */
                jQuery.ajax({
                    type : "post",
                    dataType : "json",
                    url : WOOFILAjax.ajaxurl,
                    data : {action: "get_attr_terms", taxonomy : taxonomy},
                    success: function(response) {
                      if(response.type == "success") {
                          // jQuery("#vote_counter").html(response.vote_count)
      
                         
                        console.log(response);
      
                          const append_data = (response.data).map((item)=>{
                            return new Option(item.name , item.term_id + "_" + item.name , false, true)
                          })
                          // append_data.unshift(new Option("All" ,   "0_all" , false, false));
                          // console.log(append_data);
                      
                        // $(elem).parents(".elementor-repeater-row-controls").find('[data-setting="term_listing"]').html(append_data); 
                      }
                      else {
                          console.error("Your vote could not be added")
                      }
                    }
                })    
              });
          })
      }
      
      // console.log($element.val());
    } ); 
    /* var data = {
        id: 1,
        text: 'Barn owl'
    };
    
    var newOption = new Option(data.text, data.id, false, false);
    jQuery('[data-setting="attr_listing"]').append(newOption).trigger('change'); */


  });


})(jQuery);

/* 
document.addEventListener("DOMContentLoaded", function () {
  const observer = new MutationObserver(function (mutations) {
      mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1 && node.classList.contains("elementor-repeater-fields")) {
                  console.log("New .elementor-repeater-fields added:", node);

                  // Attach click event to new elements
                  node.addEventListener("click", function () {
                      console.log(".elementor-repeater-fields clicked!", this);
                  });
              }
          });
      });
  });

  // Observe the Elementor panel for changes
  observer.observe(document.body, {
      childList: true,
      subtree: true,
  });

  // Also bind click event to existing elements
  document.querySelectorAll(".elementor-repeater-fields").forEach((el) => {
      el.addEventListener("click", function () {
          console.log(".elementor-repeater-fields clicked!", this);
      });
  });
}); */



