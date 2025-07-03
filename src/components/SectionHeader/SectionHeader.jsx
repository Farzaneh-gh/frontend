import React from "react";
import styles from "./SectionHeader.module.css";
import {Link} from "react-router-dom";
export default function SectionHeader({ title, desc, btnTitle, btnLink }) {
  return (
    <div className={styles.coursesHeader}>
      <div className={styles.coursesHeaderRight}>
        <span className={`${styles.coursesHeaderTitle} ${styles.title}`}>
          {title}
        </span>
        <span className={styles.coursesHeaderText}>{desc}</span>
      </div>
      {btnTitle ? (
        <div className={styles.coursesHeaderLeft}>
          <Link to={btnLink} className={styles.coursesHeaderLink}>
            تمامی دوره ها
            <i className={`fas fa-arrow-left ${styles.coursesHeaderIcon}`}></i>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
