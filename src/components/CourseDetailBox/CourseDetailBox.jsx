import React from 'react'
import styles from './CourseDetailBox.module.css'
const CourseDetailBox = ({ title, text, icon}) => {
  return (
    <div className='col-4'>
      <div className={styles.courseDetailBox}>
        <div className={styles.courseDetailBoxRight}>
          <i className={`fas fa-${icon} ${styles.courseDetailBoxIcon}`}></i>
        </div>
        <div className={styles.courseDetailBoxLeft}>
          <span className={styles.courseDetailBoxTitle}>{title}</span>
          <span className={styles.courseDetailBoxText}>{text}</span>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailBox