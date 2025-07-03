import React from "react";
import styles from "./FooterItem.module.css";
const FooterItem = ({ title, children }) => {
  return (
    <div className="col-4">
      <div className={styles.footerItem}>
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  );
};

export default FooterItem;
