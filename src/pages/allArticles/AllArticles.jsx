import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Topbar from "../../components/Topbar/Topbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Pagination from "../../components/Pagination/Pagination";
import "./AllArticles.css";
import ArticleBox from "../../components/ArticleBox/ArticleBox";
function AllArticles() {
  const [articles, setArticles] = React.useState([]);
  const [pageShow, setPageShow] = React.useState([]);
  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/articles`)
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
        });
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  }, []);

  return (
    <>
      <Topbar />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          { id: 2, title: "مقاله ها", to: "all-articles/1" },
        ]}
      />
      <div className="container">
        <div className="courses">
          <div className="row">
            {pageShow.map((article) => (
              <ArticleBox
                key={article.id}
                title={article.title}
                cover={`https://sabzlearn-backend.onrender.com/courses/covers/${article.cover}`}
                desc={article.desc}
                shortName={article.shortName}
              />
            ))}
          </div>
        </div>
        <div className="pagination justify-content-center">
          <Pagination
            items={articles}
            setItems={setPageShow}
            pageSize={3}
            path="all-articles"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
  
export default AllArticles;
