import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Topbar from "../../components/Topbar/Topbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";
function Courses() {
  const [courses, setCourses] = React.useState([]);
  const [pageShow, setPageShow] = React.useState([]);
  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/courses`)
        .then((response) => response.json())
        .then((data) => {
          setCourses(data);
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
          { id: 2, title: "دوره های آموزشی", to: "courses" },
        ]}
      />
      <div className="container">
        <div className="courses">
          <div className="row">
            {pageShow.map((course) => (
              <CourseBox key={course.id} course={course} colNumber="col-3" />
            ))}
         
          </div>
        </div>
        <div className="pagination justify-content-center">
          <Pagination items={courses} setItems={setPageShow} pageSize={2} path="courses"/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Courses;
