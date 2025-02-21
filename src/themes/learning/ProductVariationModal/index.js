import React , {useEffect, useRef, useState} from 'react';
import styles from './style.module.css';

export default function ProductVariationModal({productId ,variations , onClose , isLoading}) {
 

  const [product , setProduct] = useState({
    name: null,
    price: null,
    image: null,
    variations: [],
  });
  // const product = 

  const [selectedAttribute, setSelectedAttribute] = useState({})
  const [selectedVariation, setSelectedVariation] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isViewCart , setIsViewCart] = useState(false);
  const [isLoadingAddCart , setIsLoadingAddCart] = useState(false);
  const modalRef = useRef(null);
  const handleVariationSelect = (name, option) => {

    console.log(name , "name");
    console.log(option , "option");
    setSelectedAttribute((prev) => ({ ...prev, [name]: option }))
  }

  const add_to_cart = async () => {
    /* console.log(selectedAttribute);*/
    // console.log(selectedVariation.id); 
   
    
    

    if(isLoadingAddCart === true || selectedVariation === null )return;

    setIsLoadingAddCart(true);
    // console.log(id);  

    let formData = new FormData();
    formData.append('product_sku', '');
    formData.append('product_id', selectedVariation.id);
    formData.append('quantity', quantity);
    
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
    
    // console.log();
    
    // onAddToCart(selectedAttribute, quantity)
    // onClose()
  }
  useEffect(()=>{

    const selected = (product?.products)?.find((item)=> JSON.stringify(item.attributes) == JSON.stringify(selectedAttribute));
    
    setSelectedVariation( selected??null )
  },[selectedAttribute])
  useEffect(()=>{
    // console.log(variations);
    setSelectedVariation(null);
    setProduct({...product , 
      variations:variations?.products?.variation_option,
      products:variations?.products?.product_variation,
      name:variations?.products?.name,
      price: variations?.products?.price,
      image: variations?.products?.image_url,
    })
  },[variations])
  // const isVariationSelected = Object.keys(selectedAttribute)?.length === product.variations?.length


      useEffect(() => {
          const handleClickOutside = (event) => {
              // console.log(modalRef);
              if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose(); // Close the modal when clicking outside
              }
          };
  
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, [onClose]);


  return (
    <div className={styles.modalOverlay} >
        <div className={styles.modal}  ref={modalRef}>
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Select Options</h2>
            <button className={styles.closeButton} onClick={onClose} >
              {/* <X size={24} /> */} X
            </button>
          </div>
         {/* {JSON.stringify(selectedVariation)} */}
         
         {(  isLoading ===  false ) && 
          <>
                  <div className={styles.productInfo}>
                  {product.image !== null && <img src={product.image || ""} alt={product.name} className={styles.productImage} /> }
                    <div className={styles.productDetails}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productPrice}>{(product?.price !== null && product?.price !== undefined) && selectedVariation === null ? `$${product.price}` : `$${selectedVariation?.price}`  }</p>
                    </div>
                  </div>
                  {product.variations?.map((variation) => (
                    <div key={variation.name} className={styles.variationSection}>
                      <h4 className={styles.variationTitle}>{variation.name}</h4>
                      <div className={styles.variationOptions}>
                        {variation.options.map((option) => (
                          <button
                            key={option}
                            className={`${styles.variationOption} ${
                              selectedAttribute[variation.name] === option ? styles.variationOptionSelected : ""
                            }`}
                            onClick={() => handleVariationSelect(variation.name, option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
          </>
          }
           {(  isLoading ===  true ) && 
            <>

                <div className={styles.productInfo}>
                    <div className={styles.loadingImage} ></div>

                    <div className={styles.productDetails}>
                      <div className={styles.loadingTitle} ></div>
                      <div className={styles.loadingPrice} ></div>
                     
                    </div>
                  </div>
                  <div className={styles.variationSection}>
                     <div className={styles.loadingContent}></div>
                     <div className={styles.loadingDescription} />
                  </div>
                  {/* <div className={styles.productInfo}>
                    <div className={styles.loadingImage} >
                      <div className={styles.loadingContent}>
                        
                      
                      </div>
                    </div>
                    
                  </div> */}
                  
          </>
           }
          <div className={styles.addToCartSection}>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value)))}
              className={styles.quantityInput}
            />

            {/* ?add-to-cart=251 */}

            <div>

                <a /* href={`${selectedVariation  !== null ? `?add-to-cart=${selectedVariation?.id}&quantity=${quantity}` : "javascript:void(0)"}`} */ onClick={add_to_cart} className={`${styles.addToCartButton}  ${isLoadingAddCart ? styles.loadingAddCart: ""} ${selectedVariation !== null ? "": styles.disabled}`}>Add to Cart</a>
              {(isViewCart ) &&   <a href={`/cart/`} className={styles.viewCartButton} >View cart →</a>}

            </div>
            {/* <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={!isVariationSelected}>
              Add to Cart
            </button> */}
          </div>
        </div>
      </div>
       
     
  );
}

