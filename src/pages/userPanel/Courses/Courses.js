import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showCourseState, setShowCourseState] = useState("all");
  const [shownCourses, setShownCourses] = useState([]);

  const getUserCourses = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/courses`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("user")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setShownCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching user courses:", error);
      });
  };

  useEffect(() => {
    getUserCourses();
  }, []);

  return (
    <div className="col-9">
      <div className="courses">
        <div className="courses-header__panel">
          <span className="courses-header__title">دوره های ثبت نام شده</span>
          <ul className="courses-header__list">
            <li
              className="courses-header__item"
              onClick={() => {
                setShowCourseState("all");
                setShownCourses(courses);
              }}
            >
              <a
                className={`courses-header__link__panel ${
                  showCourseState === "all"
                    ? "courses-header__link-active"
                    : null
                }`}
                href="#"
              >
                همه دوره ها
              </a>
            </li>
            <li
              className="courses-header__item"
              onClick={() => {
                setShowCourseState("free");
                setShownCourses(
                  courses.filter((course) => course.course.price === 0)
                );
              }}
            >
              <a
                className={`courses-header__link__panel ${
                  showCourseState === "free"
                    ? "courses-header__link-active"
                    : null
                }`}
                href="#"
              >
                دوره های رایگان
              </a>
            </li>
            <li
              className="courses-header__item"
              onClick={() => {
                setShowCourseState("money");
                setShownCourses(
                  courses.filter((course) => course.course.price > 0)
                );
              }}
            >
              <a
                className={`courses-header__link__panel ${
                  showCourseState === "money"
                    ? "courses-header__link-active"
                    : null
                }`}
                href="#"
              >
                دوره های پولی
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="row">
            <div className="col-12">
              {shownCourses.length !== 0 ? (
                <>
                  {shownCourses.map((course) => (
                    <div
                      className="main__box row fs-5 mb-2"
                      style={{ maxHeight: "200px" }}
                    >
                      <div className="main__box-right p-0 col-4">
                        <span className="main__box-img-link col-4">
                          <img
                            className="main__box-img img-fluid cover"
                            alt="دوره"
                            src={`https://sabzlearn-backend.onrender.com/courses/covers/${course.course.cover}`}
                          />
                        </span>
                      </div>
                      <div className="main__box-left col-8">
                        <span className="main__box-title">
                          {course.course.name}
                        </span>
                        <div className="main__box-bottom">
                          <div className="main__box-all">
                            <span className="main__box-all-text">وضعیت:</span>
                            <span className="main__box-all-value">
                              {course.course.isComplete === 1
                                ? "تکمیل شده"
                                : "در حال برگزاری"}
                            </span>
                          </div>
                          <div className="main__box-completed">
                            <span className="main__box-completed-text">
                              مبلغ:
                            </span>
                            <span className="main__box-completed-value">
                              {course.course.price === 0
                                ? "رایگان"
                                : course.course.price}
                            </span>
                          </div>
                        </div>
                        <div className="main__box-completed mt-3 mb-3">
                          <span className="main__box-completed-text">
                            توضیحات:
                          </span>
                          <span className="main__box-completed-value">
                            {course.course.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="alert alert-danger mt-3">
                  دوره‌ای جهت نمایش برای این فیلتر وجود ندارد
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
