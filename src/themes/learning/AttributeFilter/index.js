import React , {useEffect, useState}from 'react';
import styles from './style.module.css';
import  {splitAtFirstUnderscore  , splitAtSecondUnderscore, titleCase} from '../../../utilities/StringReRenderer';

export default function AttributeFilter({ attritem , onChange }) {

  const [attribute, setAttribute] =useState([]);
  const [theTaxonomy, setTaxonomy] =useState([]);

  const onToggle = (term_id , taxonomy) =>{

   
    setTaxonomy(taxonomy);
    setAttribute((prevAttributes) => {
      const exists = prevAttributes.some(attr => attr.taxonomy === taxonomy && attr.term_id === term_id);
    
      if (exists) {
        // Remove if it exists
        return prevAttributes.filter(attr => !(attr.taxonomy === taxonomy && attr.term_id === term_id));
      } else {
        // Add if it does not exist
        return [...prevAttributes, { taxonomy, term_id }];
      }
    });
    
  }
  useEffect(()=>{
    onChange(attribute , theTaxonomy);
  }, [attribute])
//   console.log(attritem);
  return (
     <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>{attritem.filter_title}</h3>
      
          <ul className={styles.attributeList}>
              {(attritem.term_listing).map(i => (
                  <li className={styles.attributeItem}>
                      <div className="flex items-center space-x-2">
                      <input type='checkbox' id={i} onChange={()=>onToggle(splitAtFirstUnderscore(i) , attritem.attr_listing)}/>
                      <label
                          htmlFor={i}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                          {titleCase(splitAtSecondUnderscore(i))}
                      </label>
                      </div>
                  </li>
              ))}
              
          
          </ul>
      </div> 
  );
}
