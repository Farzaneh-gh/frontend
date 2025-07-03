import React from "react";
import styles from "./CourseBox.module.css";
import { Link } from "react-router-dom";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
export default function CourseBox({ colNumber = "col-4", course }) {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className={colNumber}>
      <div
        className={` ${styles.courseBox} ${
          colNumber === "col-12" && styles.courseBox__full
        }`}
      >
        {loading && <CircleSpinner />}
        <Link to={`/course-info/${course.shortName}`} className="col-4 ">
          <img
            src={`https://sabzlearn-backend.onrender.com/courses/covers/${course.cover}`}
            alt="Course img"
            className={`${styles.courseBox__img}`}
            style={{ display: loading ? "none" : "block" }}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(true)}
          />
        </Link>
        <div
          className={`${styles.courseBox__main} ${
            colNumber === "col-12" && "col-8"
          }`}
        >
          <Link
            to={`/course-info/${course.shortName}`}
            className={styles.courseBox__title}
          >
            {course.name}
          </Link>

          <div className={styles.courseBox__ratingTeacher}>
            <div className={styles.courseBox__teacher}>
              <i
                className={`fas fa-chalkboard-teacher ${styles.courseBox__teacherIcon}`}
              ></i>
              <Link to="#" className={styles.courseBox__teacherLink}>
                {course.creator}
              </Link>
            </div>

            <div className={styles.courseBox__rating}>
              <img
                src="/images/svgs/star.svg"
                alt="rating"
                className={styles.courseBox__star}
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className={styles.courseBox__star}
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className={styles.courseBox__star}
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className={styles.courseBox__star}
              />
              <img
                src="/images/svgs/star_fill.svg"
                alt="rating"
                className={styles.courseBox__star}
              />
            </div>
          </div>

          {colNumber === "col-12" && (
            <div className={styles.courseBox__description}>
              {course.description}
            </div>
          )}

          <div className={styles.courseBox__status}>
            <div className={styles.courseBox__users}>
              <i className={`fas fa-users ${styles.courseBox__usersIcon}`}></i>
              <span className={styles.courseBox__usersText}>
                {course.registers}
              </span>
            </div>
            <span className={styles.courseBox__price}>
              {course.price === 0 ? "رایگان" : course.price.toLocaleString()}
            </span>
          </div>
        </div>

        {colNumber !== "col-12" && (
          <div className={styles.courseBox__footer}>
            <Link
              to={`/course-info/${course.shortName}`}
              className={styles.courseBox__footerLink}
            >
              مشاهده اطلاعات
              <i
                className={`fas fa-arrow-left ${styles.courseBox__footerIcon}`}
              ></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
