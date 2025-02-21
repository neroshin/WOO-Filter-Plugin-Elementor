import React ,{ useState, useEffect, useCallback  }from 'react';
import style from './style.module.css';
// import ProgressBar from '../../../themes/learning/ProgressBar';
// import QuestionAnswerForm from '../../../themes/learning/QuestionAnswerForm';
// import Button from '../../../themes/learning/Button';
// import CountdownTimer from '../../../themes/learning/CountdownTimer';
import ProductCard from '../../../themes/learning/ProductCard';
import Pagination from '../../../themes/learning/Pagination';
import CategoryList from '../../../themes/learning/CategoryList';
import CategoryGrid from '../../../themes/learning/CategoryGrid';
import PriceRange from '../../../themes/learning/PriceRange';
import AttributeFilter from '../../../themes/learning/AttributeFilter';
import StarFilter from '../../../themes/learning/StarFilter';
import SearchProduct from '../../../themes/learning/SearchProduct';
import ProductVariationModal from '../../../themes/learning/ProductVariationModal';
import TagList from '../../../themes/learning/TagList';
import  {splitAtFirstUnderscore  , splitAtSecondUnderscore, titleCase} from '../../../utilities/StringReRenderer';

import api from '../../../api/apiClient';


export default ({title , repeaterSetting , isTargetHtml , variationPopup}) => {

    // console.log(repeaterSetting);
    console.log(variationPopup , "variationPopup");


    const [repeaterSettingFields , setRepeaterSetting] = useState(repeaterSetting)
    const [currentPage, setCurrentPage] = useState(1)
    const [products , setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [filterMemory, setFilterMemory] =useState({});
    const [productLoading, setProductLoading] =useState(false);
    const [productVariations, setProductVariations] = useState({visible:false});

    const targetElement =document.getElementById(isTargetHtml.element_id??null);
    
   
    const getProducts = async () =>{
        await api.get('/products').then(res=>{
            setTotalPages(res.headers.get("X-WP-TotalPages") );
            setTotalProducts(res.headers.get("X-WP-Total") );
            setProducts(res.data);
            
        });
  
    }

    


    const categoryTermById = async (id) => {

        const repeaterSettingCatTerm = await Promise.all(repeaterSettingFields.map((values)=>{

            const catImages =  new Promise(async (resolve, reject) => {

                    if(values === undefined )return

                    const Images = await Promise.all((values.category_listing).map((item)=>{
                        return new Promise(async (resolve, reject)  => {

                            const term_id = splitAtFirstUnderscore(item);

                            if(term_id === "0"){
                                resolve([]);
                                return;
                            }
                            setTimeout(() => {
                                resolve( api.get(`/products/category/${ splitAtFirstUnderscore(term_id) }` , 
                            ).then(res=>res.data) );
                            }, 100);
                            
                        })
                    }))

                    // console.log(values , "valuesvaluesvalues");

                    values.category_term = Images;

                    setTimeout(() => {
                        resolve(values);
                    }, 100);


                });
                return catImages;

       }));
       
      
       
        // console.log(repeaterSettingCatTerm , 'repeaterSettingCatTerm');

        setRepeaterSetting(repeaterSettingCatTerm);
       
      }
      const categoryDoFilter = async (id) =>{

        if(isTargetHtml.is_custom_element_target !== "" ){
            if(targetElement !== null){
                targetElement.classList.add("loading");
            }
            else{
                console.error("target Element is not exist Set Target HTML Product as No on elementor editor");
            }
           
        }

        const filter = {...filterMemory , category_id : id , page : 0}; 

        setFilterMemory(filter)
        setCurrentPage(1);
        // setProductLoading(true);
       /*  const params = new URLSearchParams(filter);
        await api.get(`/products?${ params.toString() }` , 
            ).then(res=>{
            setTotalPages(res.headers.get("X-WP-TotalPages") );
            setTotalProducts(res.headers.get("X-WP-Total") );
            setProducts(res.data);
           
        }); */
    }
    const handleFilterPriceMax = async (input) => {

        if(isTargetHtml.is_custom_element_target !== "" ){
            if(targetElement !== null){
                targetElement.classList.add("loading");
            }
            else{
                console.error("target Element is not exist Set Target HTML Product as No on elementor editor");
            }
           
        }
        const filter = {...filterMemory , maxPrice : input.target.value , page : 0}; 
        // console.log(filter);
        setFilterMemory(filter) 
        setCurrentPage(1);
        // setProductLoading(true);
       /*  const params = new URLSearchParams(filter);
        await api.get(`/products?${ params.toString() }` , 
            ).then(res=>{
                setTotalPages(res.headers.get("X-WP-TotalPages") );
                setTotalProducts(res.headers.get("X-WP-Total") );
                setProducts(res.data);
           
        });  */

    }
    const handleFilterPriceMin = async (input) => {
        // console.log(input.target.value)
        if(isTargetHtml.is_custom_element_target !== "" ){
            if(targetElement !== null){
                targetElement.classList.add("loading");
            }
            else{
                console.error("target Element is not exist Set Target HTML Product as No on elementor editor");
            }
           
        }
        const filter = {...filterMemory , minPrice : input.target.value , page : 0}; 
       
        setFilterMemory(filter)
        setCurrentPage(1);
        // setProductLoading(true);

      /*   const params = new URLSearchParams(filter);
        await api.get(`/products?${ params.toString() }` , 
            ).then(res=>{
                setTotalPages(res.headers.get("X-WP-TotalPages") );
                setTotalProducts(res.headers.get("X-WP-Total") );
                setProducts(res.data);
           
        });  */



    }
    const handleFilterAttribute = async (attributes , taxonomy) => {
        if(isTargetHtml.is_custom_element_target !== "" ){
            if(targetElement !== null){
                targetElement.classList.add("loading");
            }
            else{
                console.error("target Element is not exist Set Target HTML Product as No on elementor editor");
            }
           
        }
       const filter = (prevFilterMemory) => {
            const updatedAttributes = {
                ...prevFilterMemory.attributes,
                [taxonomy]: attributes,
              }

              return {...prevFilterMemory ,attributes : updatedAttributes , page : 0};
        }

        setFilterMemory(filter);
        setCurrentPage(1);
        // setProductLoading(true);

    }
  
    const handleFilterStars= async (selected) => {
        if(isTargetHtml.is_custom_element_target !== "" ){
            if(targetElement !== null){
                targetElement.classList.add("loading");
            }
            else{
                console.error("target Element is not exist Set Target HTML Product as No on elementor editor");
            }
           
        }

        // console.log(selected);
    /* 
        const filter = (prevFilterMemory) => {
             const updatedAttributes = {
                 ...prevFilterMemory.attributes,
                 [taxonomy]: attributes,
               }
 
               return {...prevFilterMemory ,attributes : updatedAttributes};
         } */
 
         setFilterMemory( {...filterMemory , stars : selected , page : 0});
         setCurrentPage(1);
        //  setProductLoading(true);
 
     }
    
     const handleSearch= async (input) => {
        if(isTargetHtml.is_custom_element_target !== "" ){
            if(targetElement !== null){
                targetElement.classList.add("loading");
            }
            else{
                console.error("target Element is not exist Set Target HTML Product as No on elementor editor");
            }
           
        }
        setFilterMemory( {...filterMemory , s : input , page : 0});
        // setProductLoading(true);
     }



     const TagFilter= async (id) => {
        if(isTargetHtml.is_custom_element_target !== "" ){
            if(targetElement !== null){
                targetElement.classList.add("loading");
            }
            else{
                console.error("target Element is not exist Set Target HTML Product as No on elementor editor");
            }
           
        }

        const filter = {...filterMemory , tag_id : id , page : 0}; 

        setFilterMemory(filter)
        setCurrentPage(1);
     }


    const handlePageChange = async (page) => {

        if(page === currentPage)return;

        if(isTargetHtml.is_custom_element_target !== "" ){
            if(targetElement !== null){
                targetElement.classList.add("loading");
            }
            else{
                console.error("target Element is not exist Set Target HTML Product as No on elementor editor");
            }
           
        }

        const filter = {...filterMemory , page : page}; 
        
        setFilterMemory(filter)

       /*  const params = new URLSearchParams(filter);
        await api.get(`/products?${ params.toString() }` , 
            ).then(res=>{
            setTotalPages(res.headers.get("X-WP-TotalPages") );
            setTotalProducts(res.headers.get("X-WP-Total") );
            setProducts(res.data);
           
        }); */
        
        setCurrentPage(page);
        // setProductLoading(true);
        // Here you would typically fetch data for the new page
        // console.log(`Fetching data for page ${page}`)
      }

      const onCloseVariation = () =>{
        setProductVariations({...productVariations , visible:false});
      }
      const handleModalVariation = (id) =>{
        // console.log(id);

        setProductVariations({...productVariations , visible:true , isLoading : true});
        api.post(`/product/variations` , {id:id }
        ).then(res=>{
                console.log(res)
                setProductVariations({...productVariations ,products : res.data , visible:true , isLoading : false});
        }); 
        // productVariations
      }



      const fetchProducts = useCallback(async (filters) => {
        setProductLoading(true)
        console.log("fasdgasdfasd");
        try {
          const filterParam = {
            ...filters,
            attributes: JSON.stringify(filters.attributes ?? "[]"),
            stars: JSON.stringify(filters.stars ?? "[]"),
          }
          const params = new URLSearchParams(filterParam)
          const response = await api.get(`/products?${params.toString()}`)
          setTotalPages(Number(response.headers["x-wp-totalpages"]))
          setTotalProducts(Number(response.headers["x-wp-total"]))
          setProducts(response.data)
        } catch (error) {
          console.error("Error fetching products:", error)
        } finally {
          setProductLoading(false)
        }
      }, [])


      useEffect(()=>{
        // console.log("filter trigger");
        fetchProducts(filterMemory)
       /*  const filterParam = {
            ...filterMemory , 
            attributes : JSON.stringify(filterMemory.attributes??"[]") ,
            stars : JSON.stringify(filterMemory.stars??"[]"),
            
        }
      
       
        const params = new URLSearchParams(filterParam);
        api.get(`/products?${ params.toString() }` , 
            ).then(res=>{
                // console.log(res)
                setTotalPages(res.headers.get("X-WP-TotalPages") );
                setTotalProducts(res.headers.get("X-WP-Total") );
                setProducts(res.data); 
                setProductLoading(false);
        });  */

    },[filterMemory])


    useEffect(()=>{

        getProducts();
        categoryTermById();
    },[])

 
    useEffect(()=>{
        // console.log(isTargetHtml , "isTargetHtmlisTargetHtml");
        if(isTargetHtml.is_custom_element_target !== ""){
            // console.log(products);
           
            const ProductList = () => (
               <>
                    <div className={style.productList}>
                    {products.map((product) => (
                        <ProductCard
                        variationPopup={variationPopup}
                        clickVariationBtn={handleModalVariation}
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        is_variation={product.is_product_variation}
                        permalink={product.permalink}
                        />
                    ))}
                    
                            
                    </div>
                    {products.length === 0 && <>
                        <span className={style.noFoundItem}>No result</span>
                    </>}
               </>
              );
              if(targetElement !== null)targetElement.classList.remove("loading");
             
              if(targetElement !== null)ReactDOM.render(<><ProductList /><Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /></>, targetElement);

              
        }
    },[products])

    useEffect(()=>{

        // const params = new URLSearchParams({id:321});
        // 252 muti
      /*   api.post(`/product/variations` , {id:252 }
            ).then(res=>{
                console.log(res)
                setProductVariations(res.data);
        });  */
    }
    ,[])
   
   
    return (
        <>
            <div className='container' style={{marginTop: "10px"}}>
      
           
       {/*      {totalPages} <br/>
            {totalProducts} */}
            <h2>{title}</h2>
           {productVariations.visible && <ProductVariationModal isLoading={productVariations.isLoading} variations={productVariations} onClose={onCloseVariation}/>}
           
           
           
            <div className={style.sidebar}>
             
                {repeaterSettingFields.map((item)=>(
                   <>
                        {item.filter_type === "categories" && 
                            <>
                            
                                {(() => {
                                    switch (item.category_style ) {
                                        case 'list':
                                            return <CategoryList catitem={item} onClick={categoryDoFilter}/>
                                        case 'grid':
                                            return <CategoryGrid catitem={item} onClick={categoryDoFilter}/>
                                        default:
                                            return ""
                                    }
                                })()}

                            </>
                        }

                        {item.filter_type === "tags" && 
                            <>
                            
                                <TagList tagitem={item} onClick={TagFilter}/>

                            </>
                        }
                        
                        {item.filter_type === "pricing" && 
                            <>
                                 <PriceRange title={item.filter_title} onChangeMin={handleFilterPriceMin} onChangeMax={handleFilterPriceMax}  />
                            </>
                        }
                        {item.filter_type === "attributes" && 
                            <>
                               
                                <AttributeFilter attritem={item} onChange={handleFilterAttribute}/>
                            </>
                        }
                        {item.filter_type === "ratings" && 
                            <>
                               <StarFilter onChange={handleFilterStars} staritem={item}/>
                            </>
                        }
                        {item.filter_type === "search" && 
                            <>
                                <SearchProduct searchitem={item} onChange={handleSearch}/>
                            </>
                        }


                   </>
                      
                ))}
              
            

               

               

             
                </div>

                
                     
                       
               {isTargetHtml.is_custom_element_target === "" && 
                    <>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    <div className={`${style.productList} ${productLoading ? "loading": ""}` }>
                        {products.map((product) => (
                            <ProductCard
                            variationPopup={variationPopup}
                            clickVariationBtn={handleModalVariation}
                            is_variation={product.is_product_variation}
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                            permalink={product.permalink}
                            />
                        ))}
              
                        
                       
                    </div> 
                    {products.length === 0 && <>
                            <span className={style.noFoundItem}>No result</span>
                        </>}
                 <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </>
                }
                    
            </div>
        </>
    )

}