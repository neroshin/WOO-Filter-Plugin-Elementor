import React from 'react';
import styles from './style.module.css';
console.log(styles);
export default function ProgressBar({width}) {
  return (
   
<div className={styles.progress_bar}>
            <div className={styles.progress} id={styles.progress} style={{width : `${width}%` ?? "30%"}}></div>
        </div>
       
     
  );
}
