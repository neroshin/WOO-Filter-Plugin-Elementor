import { render } from '@wordpress/element';
import QuestionAnswer from "./widgets/FrontComponent/QuestionAnswer";
import './themes/learning/globalStyle.scss';


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// console.log(urlParams);
// is Not Editor Mode




const widgetRender = (elem) =>{
    elem.forEach((widget , index) => {
        // console.log("widget" , index)
        const title = widget.dataset.widgetTitle;
        const repeaterSetting = JSON.parse(widget.dataset.repeaterSetting);
        const isTargetHtmlSetting = JSON.parse(widget.dataset.isTargetHtmlSetting);
        const variationPopup = widget.dataset.variationPopup;
    //    console.log(isTargetHtmlSetting);
        // Create a new container element to replace the existing widget
        const newElement = document.createElement('div');
        newElement.className = 'react-widget-container'; // Add a custom class for identification

        // Replace the original widget with the new container
        widget.replaceWith(newElement);

        // Render the React component into the new container
        render(<QuestionAnswer variationPopup={variationPopup} title={title} repeaterSetting={repeaterSetting} isTargetHtml={isTargetHtmlSetting} />, newElement);
    });	 
}

if(urlParams.get('elementor-preview') === null){
    console.log("Livemode")
    const widgets = document.querySelectorAll('.react-widget');
    
    widgetRender(widgets);
}
else{  
    console.log("EditorMode")
    // Run the function after the page loads
    document.addEventListener('DOMContentLoaded', customObserveWidgets);

    // Function to observe if '.react-widget' elements exist or are added dynamically
    function customObserveWidgets() {
        // Select the parent node (e.g., the body or container where widgets may be added)
        const customtargetNode = document.body;
        
        // Define the observer options
        const customobserverOptions = {
            childList: true, // Observe additions/removals of child elements
            subtree: true,   // Observe all descendants
        };

        // Initialize the MutationObserver
        const observer = new MutationObserver((mutationsList) => {
        
            mutationsList.forEach((mutation) => {
            
                // Check if new elements are added
                if (mutation.type === 'childList') {
                
                    // Query for '.react-widget' elements
                    const widgets = document.querySelectorAll('.react-widget');
                    // console.log(widgets);
                    if (widgets.length >= 1) {
                        // console.log(`Found ${widgets.length} .react-widget elements.`);
                        widgetRender(widgets);
                        /* widgets.forEach(widget => {
                            // 
                            const title = widget.dataset.widgetTitle;
                            //  console.log(title)
                            render(
                                <QuestionAnswer title={title}/>,
                                widget
                            ); 
                        });	 */
                        // Perform an action if needed, e.g., disconnect the observer
                        // observer.disconnect(); // Uncomment if no further monitoring is needed
                    }
                }
            });
        });

        // Start observing the target node
        observer.observe(customtargetNode, customobserverOptions);

        // Perform an initial check if the elements already exist
        const initialWidgets = document.querySelectorAll('.react-widget.editor');
        if (initialWidgets.length > 0) {
            // console.log(`Initially found ${initialWidgets.length} .react-widget elements.`);
        }
    }
}
/* 
document.addEventListener('DOMContentLoaded', ()=>{
    console.log("DOM fully loaded");

    jQuery(window).on('load', () => {
        //  console.log("Elementor Frontend initialized");
        // console.log( window.elementorFrontend);  
        // const widgets = document.querySelectorAll('.react-widget');
        // console.log(widgets); 
        console.log("Elementor Frontend initialized");
        console.log( window.elementorFrontend); 
        console.log( window.elementorFrontend.hooks.addAction); 

        window.elementorFrontend.hooks.addAction( 'frontend/element_ready/hello_world_widget_1.default', customObserveWidgets);
        // jQuery(window).on('elementor/frontend/init', () => {
           
        //     console.log( window.elementorFrontend);  
        // }); 
    });
  
}) */
/* document.addEventListener('elementor/editor/init', ()=>{
    
    const widgets = document.querySelectorAll('.react-widget');
    console.log(widgets);
    widgets.forEach(widget => {
        // 
         const title = widget.dataset.widgetTitle;
        //  console.log(title)
        render(
            <QuestionAnswer title={title}/>,
            widget
        ); 
    });	 
}); */
// customObserveWidgets();
/* 
 widgets.forEach(widget => {
	// 
	 const title = widget.dataset.widgetTitle;
	//  console.log(title)
	render(
		<QuestionAnswer title={title}/>,
		widget
	); 
});	  */

/* import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('my-react-wp-plugin');
  if (container) {
    ReactDOM.render(window.React.createElement(<h1>fasd</h1>), container);
  }
}); */