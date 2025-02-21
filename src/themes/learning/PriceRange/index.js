import React from 'react';
import styles from './style.module.css';

export default function CategoryGrid({ title ,onChangeMin , onChangeMax}) {

//   console.log(catitem);
  return (
    <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>{title}</h3>
    
        <div className={styles.priceinputs}>
        <input type="number" onChange={onChangeMin} placeholder="Min" className={styles.priceinput} />
        <input type="number" onChange={onChangeMax} placeholder="Max" className={styles.priceinput} />
        </div>
    </div>
  );
}
