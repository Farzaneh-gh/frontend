import React from "react";
import styles from "./Breadcrumb.module.css";
import { Link } from "react-router-dom";
function Breadcrumb({ links }) {
  return (
    <div className="container mb-5">
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbHome__icon}>
          <i className="fas fa-home "></i>
        </div>
        <ul className={styles.breadcrumb__list}>
          {links.map((link, index) => (
            <li key={index}>
              <Link to={`/${link.to}`} className={styles.breadcrumb__link}>
                {link.title}
              </Link>
              {index !== links.length - 1 && (
                <i
                  className={`fas fa-angle-left ${styles.breadcrumb__icon}`}
                ></i>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumb;
