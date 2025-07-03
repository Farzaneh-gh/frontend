import React, { useEffect } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Navebar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./CourseInfo.module.css";
import { Link } from "react-router-dom";
import CourseDetailBox from "../../components/CourseDetailBox/CourseDetailBox";
import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import CommentsTextArea from "../../components/CommentsTextArea/CommentsTextArea";
import swal from "sweetalert";

const CourseInfo = () => {
  const { courseName } = useParams();
  const [courseInfo, setCourseInfo] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [sessions, setSessions] = React.useState([]);
  const [teacher, setTeacher] = React.useState({});

  function formatPersianDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR");
  }
  useEffect(() => {
    const token = Cookies.get("user");
    fetch(`${process.env.REACT_APP_BACKEND_URL}/courses/${courseName}`, {
      headers: {
        Authorization: `Bearer ${token === null ? null : token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        setCourseInfo(data);
        setComments(data.comments);
        setSessions(data.sessions);
        setTeacher(data.creator);
        console.log(data);
      });
    });
  }, [courseName]);

  const registerInCourse = async () => {
    if (courseInfo.price === 0) {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          const token = Cookies.get("user");
          fetch(`${process.env.REACT_APP_BACKEND_URL}/courses/${courseInfo._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: courseInfo.price,
            }),
          }).then((res) => {
            console.log(res);
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                window.location.reload();
              });
            }
          });
        }
      });
    }
  };

  return (
    <div>
      <Topbar />
      <Navebar />{" "}
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "آموزش برنامه نویسی فرانت‌اند",
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: "دوره متخصص جاوا اسکریپت",
            to: "course-info/js-expert",
          },
        ]}
      />
      <section className="container">
        <div className={styles.CourseInfo}>
          <div className="row">
            <div className="col-6">
              <Link to="#" className={styles.courseInfo__link}>
                {courseInfo.categoryID?.title}{" "}
              </Link>
              <h1 className={styles.courseInfo__title}>{courseInfo.name}</h1>
              <p className={styles.courseInfo__text}>
                {courseInfo.description}
              </p>
              <div className={styles.courseInfo__socialMedias}>
                <Link to="#" className={styles.courseInfo__socialMediaItem}>
                  <i className="fab fa-telegram-plane course-info__icon"></i>
                </Link>
                <Link to="#" className={styles.courseInfo__socialMediaItem}>
                  <i className="fab fa-twitter course-info__icon"></i>
                </Link>
                <Link to="#" className={styles.courseInfo__socialMediaItem}>
                  <i className="fab fa-facebook-f course-info__icon"></i>
                </Link>
              </div>
            </div>
            <div className="col-6">
              <video
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                className={styles.courseInfo__video}
                poster={`/images/courses/${courseInfo.cover}`}
                controls
              ></video>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.main}>
        <section className="container">
          <div className="row">
            <div div className="col-8">
              <div className={styles.courseBoxes}>
                <div className="row">
                  <CourseDetailBox
                    icon="graduation-cap"
                    title="وضعیت دوره:"
                    text={
                      courseInfo.isComplete === 1
                        ? "به اتمام رسیده"
                        : "در حال برگزاری"
                    }
                  />
                  <CourseDetailBox
                    icon="clock"
                    title=" زمان برگزاری دوره:"
                    text={
                      courseInfo.createdAt
                        ? formatPersianDate(courseInfo.createdAt)
                        : "در حال بارگذاری..."
                    }
                  />
                  <CourseDetailBox
                    icon="calendar-alt"
                    title="آخرین بروزرسانی:"
                    text={
                      courseInfo.updatedAt
                        ? formatPersianDate(courseInfo.updatedAt)
                        : "در حال بارگذاری..."
                    }
                  />
                  <CourseDetailBox
                    icon="fa-solid fa-headset"
                    title="شتیبان دوره:"
                    text={courseInfo.support}
                  />
                  <CourseDetailBox
                    icon="fa-solid fa-chalkboard-user"
                    title=" مدرس دوره:"
                    text={courseInfo.creator?.name}
                  />
                  <CourseDetailBox
                    icon="fa-solid fa-tag"
                    title=" قیمت دوره:"
                    text={courseInfo.price}
                  />
                </div>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressBar__header}>
                  <i className="fas fa-chart-line course-progress__icon"></i>
                  <div className={styles.progressBar__title}>
                    <span>پیشرفت دوره: 100%</span>
                  </div>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped bg-success opacity-75"
                    role="progressbar"
                    aria-label="Basic example"
                    style={{ width: "100%" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <div className={styles.introduction}>
                <div className="introduction__item">
                  <span className="introduction__title title mb-3">
                    آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                  </span>
                  <img
                    src="/images/info/1.gif"
                    alt="course info1"
                    className={`${styles.introduction__img} img-fluid`}
                  />
                  <p className={styles.introduction__text}>
                    کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد و
                    سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود که
                    در بازار کار به شدت از آن ها استفاده می شود و اگر بدون بلد
                    بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت خواهید
                    شد و حتی ممکن است ناامید شوید!
                  </p>
                  <p className={styles.introduction__text}>
                    در این دوره نحوه کار با 20 مورد از پر استفاده ترین کتابخانه
                    های جاوا اسکریپت به صورت پروژه محور به شما عزیزان آموزش داده
                    می شود تا هیچ مشکلی برای ورود به بازار کار نداشته باشید
                  </p>
                </div>
                <div className="introduction__item mt-4">
                  <span className="introduction__title title ">
                    هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                    درآمد)
                  </span>
                  <img
                    src="/images/info/2.jpg"
                    alt="course info"
                    className={`${styles.introduction__img} img-fluid`}
                  />
                  <p className={styles.introduction__text}>
                    وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                    از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                    حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                    موقع از این کتابخانه ها استفاده نکرده بودم.
                  </p>
                  <p className={styles.introduction__text}>
                    همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از مهم
                    ترین مباحثی هستند که هر برنامه نویس وب برای ورود به بازار
                    کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار کرده
                    باشد{" "}
                  </p>
                  <p className={styles.introduction__text}>
                    همان طور که از اسم این دوره مشخص است، هدف از این دوره آموزش
                    20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه های جاوا
                    اسکریپت است تا شما بتوانید بعد از این دوره با قدرت و آمادگی
                    بیشتر ادامه مسیر برنامه نویسی وب را ادامه دهید، ری اکت یا
                    نود یا … را راحت تر یاد بگیرید و در نهایت وارد بازار کار شده
                    و کسب درآمد کنید.
                  </p>
                  <p className={styles.introduction__text}>
                    شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                    کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                    جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                    آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                  </p>
                  <p className={styles.introduction__text}>
                    در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                    نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                    دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                    خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و وب
                    اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                  </p>
                </div>
                <div className={styles.introduction__btns}>
                  <Link href="#" className={styles.introduction__btnsItem}>
                    دانلود همگانی ویدیوها
                  </Link>
                  <Link href="#" className={styles.introduction__btnsItem}>
                    دانلود همگانی پیوست‌ها
                  </Link>
                </div>
              </div>
              <div className={styles.teacherDetailes}>
                <div className={styles.teacherDetailes__header}>
                  <div className={styles.teacherDetailes__content}>
                    <img
                      src="/images/info/teacher.jfif"
                      alt="teacher"
                      className={`${styles.teacherDetailes__img} img-fluid`}
                    />
                    <div>
                      <span className={styles.teacherDetailes__name}>
                        {teacher.name ? teacher.name : "امیرحسین شریفی"}
                      </span>
                      <span className={styles.teacherDetailes__job}>
                        مدرس و برنامه نویس فرانت اند
                      </span>
                    </div>
                  </div>
                  <div className={styles.teacherDetailes__socialMedias}>
                    <Link
                      to="#"
                      className={`${styles.teacherDetailes__btn} btn `}
                    >
                      <i
                        className={`fas fa-chalkboard-teacher ${styles.techerDetailes__icon}`}
                      ></i>
                      <span className={styles.teacherDetailes__btnText}>
                        {" "}
                        مشاهده پروفایل{" "}
                      </span>
                    </Link>
                  </div>
                </div>
                <div>
                  <p className={styles.teacherDetailes__text}>
                    سلام من امیرحسین شریفی هستم. مدرس و برنامه نویس فرانت اند با
                    4 سال سابقه کار در این حوزه. در این دوره سعی کردم تمام
                    تجربیات خودم را در زمینه یادگیری کتابخانه های جاوا اسکریپت
                    به شما عزیزان انتقال بدم تا شما هم بتونید با قدرت و آمادگی
                    بیشتر وارد بازار کار بشید و کسب درآمد کنید.
                  </p>
                </div>
              </div>
              <div className={styles.accordion__topic}></div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className={styles.accordion}>
                  <Accordion.Header className={styles.accordion__header}>
                    معرفی دوره
                  </Accordion.Header>
                  {sessions.length > 0 &&
                    sessions.map((session, index) => (
                      <Accordion.Body
                        className={styles.accordion__body}
                        key={index}
                      >
                        <div className={styles.introduction__accordion}>
                          <span
                            className={styles.introduction__accordion__count}
                          >
                            {index + 1}
                          </span>
                          <i
                            className={`fab fa-youtube ${styles.introduction__accordion_icon}`}
                          ></i>
                          {courseInfo.isUserRegisteredToThisCourse === true || courseInfo.free === 1 ? (
                            <Link
                              to={`/${courseName}/${session._id}`}
                              className={styles.introduction__accordion_link}
                            >
                              {session.title}
                            </Link>
                          ) : (
                            <>
                              <span
                                className={styles.introduction__accordion_link}
                              >
                                {session.title}
                              </span>
                             
                            </>
                          )}
                        </div>
                        <div className="introduction__accordion-left ">
                          <span className="introduction__accordion-time">
                            {session.time}
                          </span>
                          {courseInfo.isUserRegisteredToThisCourse !== true ? (
                            <i className="fas fa-lock course-info__lock-icon p-2"></i>
                          ) : null}
                        </div>
                      </Accordion.Body>
                    ))}
                </Accordion.Item>
              </Accordion>
              <CommentsTextArea
                comments={comments}
                courseShortName={courseName}
              />
            </div>
            <div className="col-4">
              <div className={styles.coursesInfo}>
                <div className={styles.course_info__register}>
                  {courseInfo.isUserRegisteredToThisCourse === true ? (
                    <span>
                      <i className="fas fa-graduation-cap course-info__register-icon"></i>
                      دانشجوی دوره هستید
                    </span>
                  ) : (
                    <span
                      className={styles.courseInfo__register}
                      onClick={() => registerInCourse()}
                    >
                      ثبت نام در دوره
                    </span>
                  )}
                </div>
                <div className={styles.courseInfo}>
                  <div className={styles.courseInfo__total}>
                    <div className={styles.courseInfo__totalTop}>
                      <div className={styles.courseInfo__totalSale}>
                        <i
                          className={`fas fa-users ${styles.courseInfo__totalSaleIcon}`}
                        ></i>
                        <span className={styles.courseInfo__totalSaleText}>
                          تعداد دانشجو :
                        </span>
                        <span className={styles.courseInfo__totalSaleNumber}>
                          178
                        </span>
                      </div>
                    </div>

                    <div className={styles.courseInfo__totalBottom}>
                      <div>
                        <i
                          className={`far fa-comments ${styles.courseInfo__totalCommentIcon}`}
                        ></i>
                        <span className={styles.courseInfo__totalCommentText}>
                          67 دیدگاه
                        </span>
                      </div>
                      <div className={styles.courseInfo__totalView}>
                        <i
                          className={`far fa-eye ${styles.courseInfo__totalViewIcon}`}
                        ></i>
                        <span className={styles.courseInfo__totalViewText}>
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.courseInfo}>
                  <div className={styles.courseInfo__url}>
                    <i
                      className={`fas fa-link ${styles.courseInfo__urlIcon}`}
                    ></i>
                    <span className={styles.courseInfo__urlText}>
                      لینک دوره:
                    </span>
                  </div>
                  <div>
                    <Link to="#" className={styles.courseInfo__urlLink}>
                      https://greenlearn.ir/course/js-expert
                    </Link>
                  </div>
                </div>

                <div className={styles.courseInfo}>
                  <div className={styles.courseInfoTopic__title}>
                    <span>سرفصل های دوره</span>
                    <span>
                      برای مشاهده و یا دانلود دوره روی کلمه
                      <Link to="#" className={styles.courseInfoTopic__link}>
                        {" "}
                        لینک
                      </Link>{" "}
                      کلیک کنید
                    </span>
                  </div>
                </div>

                <div className={styles.courseInfo}>
                  <span className={styles.courseInfo__coursesTitle}>
                    دوره های مرتبط
                  </span>
                  <ul className={styles.courseInfo__coursesList}>
                    <li className={styles.courseInfo__coursesListItem}>
                      <Link to="#" className={styles.courseInfo__coursesLink}>
                        <img
                          src="/images/courses/js_project.png"
                          alt="Course Cover"
                          className={styles.courseInfo__coursesImg}
                        />
                        <span className={styles.courseInfo__coursesText}>
                          پروژه های تخصصی با جاوا اسکریپت
                        </span>
                      </Link>
                    </li>
                    <li className={styles.courseInfo__coursesListItem}>
                      <Link to="#" className={styles.courseInfo__coursesLink}>
                        <img
                          src="/images/courses/fareelancer.png"
                          alt="Course Cover"
                          className={styles.courseInfo__coursesImg}
                        />
                        <span className={styles.courseInfo__coursesText}>
                          تعیین قیمت پروژه های فریلنسری
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CourseInfo;
