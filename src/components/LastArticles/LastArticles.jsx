import React, { useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ArticleBox from "../ArticleBox/ArticleBox";
function LastArticles() {
  const [allArticles, setAllArticles] = React.useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/articles`).then((response) =>
      response
        .json()
        .then((data) => {
          const lastData = data.length > 3 ? data.slice(0, 3) : data;
          setAllArticles(lastData);
        })
        .catch((error) => console.error("Error fetching articles:", error))
    );
  }, []);
  return (
    <div className="container ">
      <SectionHeader
        title="جدیدترین مقالات"
        desc="سکوی پرتاپ شما به سمت موفقیت"
        btnTitle="تمامی مقالات"
        btnLink="/all-articles/1"
      />
      <div className="container mt-5 mb-5">
        <div className="row">
          {allArticles.map((article) => (
            <ArticleBox
              key={article.id}
              title={article.title}
              cover={`http://localhost:4001/courses/covers/${article.cover}`}
              desc={article.desc}
              shortName={article.shortName}
            />
          ))}
          {/* Static articles for demonstration */}
        </div>
      </div>
    </div>
  );
}

export default LastArticles;
