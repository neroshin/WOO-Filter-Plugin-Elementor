import React from 'react';
import styles from './style.module.css';
import Button from '../Button';
export default function QuestionAnswerForm({question , option , name , selectAnswer}) {

 
  const onChangeAnwser = (e , index) =>{
    e.preventDefault();
    selectAnswer([index]);
    
  }
  
  return (
    <div className={styles.questionContent}>
    
     <h2 >{question}</h2 >
  
    <div className={styles.answers}>
      {(option.choices).map((item , index) => (
          <Button className={`${styles.answer} ${styles.qdf_button} ${Object(option?.selectedAnswer??[]).includes(index) ? styles.selected: ''}`} onClick={(e)=>onChangeAnwser(e , index)}>
           
           
            {item}
            </Button>
      ))}
        </div>

     
    </div>
  );
}
