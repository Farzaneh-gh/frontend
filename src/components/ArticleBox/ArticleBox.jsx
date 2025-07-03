import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./ArticleBox.module.css";
const ArticleBox = ({ title, desc, cover, shortName }) => {

  return (
    <div className="col-4">
      <div className={styles.articleBox}>
        <img src={cover} alt="Article" className="courseBox__img" />
        <div className={styles.articleContent}>
          <h3 className="mt-2"> {title}</h3>
          <p className="text-muted"> {desc}</p>
          <Link
            to={`/article-info/${shortName}`}
            className={styles.articleLink}
          >
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleBox