import React,{useEffect,useState} from 'react'
import './Search.css'
import Topbar from '../../components/Topbar/Topbar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useParams } from 'react-router-dom'
import CourseBox from '../../components/CourseBox/CourseBox'
import ArticleBox from '../../components/ArticleBox/ArticleBox'
function Search() {
    const [courses, setCourses] = useState([]);
    const [articles, setArticles] = useState([]);
    const {value} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search/${value}`);
                const data = await response.json();
                setCourses(data.allResultCourses);
                setArticles(data.allResultArticles);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        fetchData();
    }, [value]);
  return (
    <>
      <Topbar />
      <Navbar />

      <div className="container">
        <div className="row justify-content-center mt-5">
          {courses.length > 0 && (
            courses.map((course) => (
              <CourseBox key={course.id} course={course} colNumber="col-4" />
            ))
          )}
        </div>

        <div className="row justify-content-center mt-5">
          {articles.length > 0 && (
            articles.map((article) => (
              <ArticleBox
                key={article.id}
                title={article.title}
                cover="/images/blog/1.jpg"
                desc={article.desc}
                shortName={article.shortName}
              />
            ))
          ) }
        </div>
        {courses.length === 0 && articles.length === 0 && (
          <div className="text-center mt-5 alert alert-warning">
            <h3>نتیجه‌ای یافت نشد</h3>
            <p>متاسفانه هیچ دوره یا مقاله‌ای با این عنوان پیدا نشد.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Search