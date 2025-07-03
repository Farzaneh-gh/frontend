import React from "react";

import styles from "./AboutUsBox.module.css";

export default function AboutUsBox({ title, desc, icon }) {
  return (
    <div className="col-6">
      <div className={styles.aboutUsBox}>
        <div className={styles.aboutUsBoxRight}>
          <i className={`${icon} ${styles.aboutUsIcon}`}></i>
        </div>
        <div className={styles.aboutUsBoxLeft}>
          <span className={styles.aboutUsBoxTitle}>{title}</span>
          <span className={styles.aboutUsBoxText}>{desc}</span>
        </div>
      </div>
    </div>
  );
}
