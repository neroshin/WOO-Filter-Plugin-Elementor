import React , {useState}from 'react';
import styles from './style.module.css';
import api from '../../../api/apiClient';
import gear from '../../../../assets/images/gear-rotation-svgrepo-com.svg';

export default function ProductCard({ id, name, price, image , is_variation , permalink , clickVariationBtn , variationPopup}) {

  const [isViewCart , setIsViewCart] = useState(false);
  const [isLoadingAddCart , setIsLoadingAddCart] = useState(false);
  const add_to_cart = async (e) =>{


    if(isLoadingAddCart === true )return;

    setIsLoadingAddCart(true);
    console.log(id);  

    let formData = new FormData();
    formData.append('product_sku', '');
    formData.append('product_id', id);
    formData.append('quantity', 1);
    
    try {
      const response = await fetch(`${react_ajax_object.get_site_url_react}/?wc-ajax=add_to_cart`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Submission failed")
      }

      const result = await response.json()
      // setMessage("Form submitted successfully!")
      if(result.cart_hash !== undefined){
        setIsViewCart(true);
        setIsLoadingAddCart(false);

        if(result.fragments  !== undefined){
          
            Object.entries(result.fragments).forEach(([selector, html]) => {
              const element = document.querySelector(selector);
              if (element) {
                  element.outerHTML = html;
              }
          });
        }
        
      }
    } catch (error) {
      // setMessage("An error occurred. Please try again.")
      console.error("Submission error:", error)
    } finally {
      // setIsLoading(false)
    }
    // pr
  }
  const onClickVariation = (e) =>{
      e.preventDefault();
   /*    console.log("onClickVariation");
      console.log(id); */
      clickVariationBtn(id);
  }
  return (
    <div className={`productItem ${styles.productCard}`}>
      <img src={image || "/placeholder.svg"} alt={name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{name}</h3>
        <p className={styles.productPrice}>${parseInt(price).toFixed(2)}</p>

        
        {!is_variation &&   <a /* href={`?add-to-cart=${id}`} */ onClick={add_to_cart} className={`${styles.addToCartButton} ${isLoadingAddCart ? styles.loadingAddCart: ""}`}>Add to Cart</a>}
        {(is_variation && variationPopup === "yes" ) &&   <a /* href={permalink} */ className={styles.addToCartButton} onClick={onClickVariation}>Select options</a>}
        {(is_variation && variationPopup === "" ) &&   <a href={permalink} className={styles.addToCartButton} >Select options</a>}
        {(isViewCart ) &&   <a href={`/cart/`} className={styles.viewCartButton} >View cart →</a>}
      
      </div>
  </div>
       
     
  );
}

