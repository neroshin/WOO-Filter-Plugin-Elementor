import React , {useEffect, useState}from 'react';
import styles from './style.module.css';
// import  {splitAtFirstUnderscore  , splitAtSecondUnderscore, titleCase} from '../../../utilities/StringReRenderer';

export default function StarFilter({onChange , staritem}) {

  
  const [selectedStars, setSelectedStars] = useState([])

  const handleStarClick = (rating) => {
    setSelectedStars((prevSelected) => {
      const newSelected = prevSelected.includes(rating)
        ? prevSelected.filter((star) => star !== rating)
        : [...prevSelected, rating]

        // console.log(newSelected);
      onChange(newSelected)
      return newSelected
    })
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? styles.star : styles.emptystar}>
        ★
      </span>
    ))
  }

//   console.log(attritem);
  return (
    <div className={styles.filterContainer}>
      <h3 className={styles.filterTitle}>{staritem?.filter_title}</h3>
      <ul className={styles.starList}>
        {[5, 4, 3, 2, 1].map((rating) => (
          <li key={rating} className={styles.starItem} onClick={() => handleStarClick(rating)}>
            <input
              type="checkbox"
              checked={selectedStars.includes(rating)}
              onChange={() => {}}
              className={styles.checkbox}
            />
            <div className={styles.starRating}>
              {renderStars(rating)}
              {rating !== 5 &&  <span className={styles.ratingText}>& Up</span>}
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
