import React , { useState } from 'react';
import styles from './style.module.css';
import  {splitAtFirstUnderscore  , splitAtSecondUnderscore, titleCase} from '../../../utilities/StringReRenderer';

export default function CategoryList({catitem , onClick}) {

  const [currentRadio , setCurrentRadio] = useState("0");
  // console.log(catitem);

  const onClickCat = (subitem)=>{
    onClick(splitAtFirstUnderscore(subitem));
    console.log( subitem );

    setCurrentRadio(subitem)
  }
  return (
     <div className={styles.filterSection}>             
              <h3 className={styles.filterTitle}>{catitem.filter_title}</h3>
             
              <ul className={styles.categoryList}>
              {/* `${styles.categoryItem} ${subitem === currentRadio?styles.activeCat:null} ` */}
                  {(catitem.category_listing).map( (subitem , index)=>(
                      <li onClick={()=>{onClickCat(subitem)}}  className={`${styles.categoryItem} ${subitem === currentRadio?styles.activeCat:""}`}>
                        {/* {subitem === currentRadio && <span className={`${styles.activeCatIcon}`}></span>} */}
                      
                          {catitem.category_image === "yes" && <img className={styles.imageIcon} src={`${catitem?.category_term?.[index].image_url !== false && catitem?.category_term?.[index].image_url !== undefined ? catitem?.category_term?.[index].image_url : "https://dummyimage.com/165x165/000/fff"})`}/> }
                            
                        <span className={styles.categoryLink}>
                            {subitem == '0' ?  "all" :titleCase(splitAtSecondUnderscore(subitem))}
                        </span>
                        
                     
                  </li>
                  ))}
                  
                  
              </ul>
      </div>
  );
}
