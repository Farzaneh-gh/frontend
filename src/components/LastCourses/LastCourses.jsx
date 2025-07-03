import React, { useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";

import styles from "./LastCourses.module.css";
import CourseBox from "../CourseBox/CourseBox";
export default function LastCourses() {
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/courses`)
        .then((response) => response.json())
        .then((data) => {
          const lastData = data.length>6? data.slice(0, 6) : data;
          setCourses(lastData);
        });
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, []);
  return (
    <>
      <div className={styles.courses}>
        <div className="container">
          <SectionHeader
            title="جدیدترین دوره ها"
            desc="سکوی پرتاپ شما به سمت موفقیت"
            btnTitle="تمامی دوره ها"
            btnLink="/courses/1"
          />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.map((course) => (
                  <CourseBox key={course.id} course={course} colNumber="col-4" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
