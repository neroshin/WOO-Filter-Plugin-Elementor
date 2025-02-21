import React , {useEffect, useState}from 'react';
import styles from './style.module.css';
import  {splitAtFirstUnderscore  , splitAtSecondUnderscore, titleCase} from '../../../utilities/StringReRenderer';

export default function AttributeFilter({ searchitem , onChange }) {
  const [searchTerm, setSearchTerm] = useState("")
//   console.log(attritem);
  useEffect(()=>{
    onChange(searchTerm);
  },[searchTerm])
  return (
     <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>{searchitem.filter_title}</h3>
      
          <div className={styles.searchInput}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
              />
            </div>
      </div> 
  );
}
