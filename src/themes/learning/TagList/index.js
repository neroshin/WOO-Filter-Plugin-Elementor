import React , { useState } from 'react';
import styles from './style.module.css';
import  {splitAtFirstUnderscore  , splitAtSecondUnderscore, titleCase} from '../../../utilities/StringReRenderer';

export default function TagList({tagitem , onClick}) {

  const [currentRadio , setCurrentRadio] = useState("0");
  console.log(tagitem);

  const onClickTag = (subitem)=>{
    onClick(splitAtFirstUnderscore(subitem));
    console.log( subitem );

    setCurrentRadio(subitem)
  }
  return (
     <div className={styles.filterSection}>             
              <h3 className={styles.filterTitle}>{tagitem.filter_title}</h3>
             
              <ul className={styles.tagList}>
              {/* `${styles.tagItem} ${subitem === currentRadio?styles.activetag:null} ` */}
                  {(tagitem.tags_listing).map( (subitem , index)=>(
                      <li onClick={()=>{onClickTag(subitem)}}  className={`${styles.tagItem} ${subitem === currentRadio?styles.activetag:""}`}>
               
                        <span className={styles.tagLink}>
                            {subitem == '0' ?  "all" :titleCase(splitAtSecondUnderscore(subitem))}
                        </span>
                        
                     
                  </li>
                  ))}
                  
                  
              </ul>
      </div>
  );
}
