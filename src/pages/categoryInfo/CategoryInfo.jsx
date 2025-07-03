import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./CategoryInfo.module.css";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";
import { useParams } from "react-router-dom";

const CategoryInfo = () => {
  const { categoryName } = useParams();
  const [category, setCategory] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض");
  const [status, setStatus] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [coursesDisplayType, setCoursesDisplayType] = useState("grid");
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/courses/category/${categoryName}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched courses:", data);
        setCategory(data);
      })
      .catch((err) => console.error("Error fetching category courses:", err));
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free":
        setOrderedCourses(category.filter((course) => course.price === 0));
        break;
      case "paid":
        setOrderedCourses(category.filter((course) => course.price !== 0));
        break;
      case "last":
        setOrderedCourses(category);
        break;
      case "first":
        setOrderedCourses(category.slice().reverse());
        break;
      default:
        setOrderedCourses(category);
    }
  }, [status, category]);

  // Sorting options
  const sortingOptions = [
    { key: "default", label: "مرتب سازی پیش فرض" },
    { key: "free", label: "مرتب سازی دوره های رایگان" },
    { key: "paid", label: "مرتب سازی دوره های پولی" },
    { key: "last", label: "مرتب سازی بر اساس آخرین" },
    { key: "first", label: "مرتب سازی بر اساس اولین" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredCourses = category.filter((course) =>
      course.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setOrderedCourses(filteredCourses);
  };
  return (
    <div>
      <Topbar />
      <Navbar />
      <div className="container">
        <div className={styles.topSection}>
          <div className={styles.topSection__right}>
            <div className={`${styles.topSectionIcon} ${coursesDisplayType === "grid" ? styles.active : ""}`} onClick={() => setCoursesDisplayType("grid")}>
              <i className="fas fa-border-all fs-3"></i>
            </div>
            <div className={`${styles.topSectionIcon} ${coursesDisplayType === "row" ? styles.active : "" }`} onClick={() => setCoursesDisplayType("row")}>
              <i className="fas fa-align-left fs-3"></i>
            </div>
            <div className={styles.topbarSelection}>
              <span className={styles.topbarSelection__title}>
                {statusTitle}
              </span>
              <i className="fas fa-angle-down"></i>
              <ul className={styles.coursesTopBar__selection}>
                {sortingOptions.map((option) => (
                  <li
                    key={option.key}
                    className={styles.coursesTopBar__selectionItem}
                    onClick={() => {
                      setStatus(option.key);
                      setStatusTitle(option.label);
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.topSection__left}>
            <input
              type="text"
              className={styles.topSection__search}
              placeholder="جستجو در دوره ها"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className={styles.topSection__searchIcon}>
              <i className="fas fa-search"></i>
            </div>
          </div>
        </div>

        <div className={styles.coursesContent}>
          <div className="row">
            {orderedCourses?.length > 0 ? (
              <>
                {orderedCourses.map((course) => (
                  <CourseBox
                    key={course.id}
                    course={course}
                    colNumber={coursesDisplayType === "grid" ? "col-4" :"col-12" }
                  />
                ))}
              </>
            ) : (
              <p className="alert alert-danger">
                دوره ای برای این دسته وجود ندارد
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryInfo;
