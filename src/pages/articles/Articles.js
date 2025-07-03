import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Topbar from "../../components/Topbar/Topbar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./Articles.module.css";

import { Link } from "react-router-dom";
import "./Articles.css";
import Html from "../../components/Html/Html";

import { useParams } from "react-router-dom";
import CommentsTextArea from "../../components/CommentsTextArea/CommentsTextArea";
const Articles = () => {
  const { articleId } = useParams();
  const [article, setArticle] = React.useState(null);
  const [articleCategory, setArticleCategory] = React.useState(null);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/articles/${articleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Article data:", data);
        setArticle(data);
        setArticleCategory(data.categoryID);
      })
      .catch((error) => console.error("Error fetching article data:", error));
  }, [articleId]);
  return (
    <div>
      <Topbar />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "مقاله ها",
            to: "category-info/frontend",
          },
          {
            id: 3,
            title: "ویو Vs ری‌اکت",
            to: "course-info/js-expert",
          },
        ]}
      />{" "}
      <main className={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className={styles.article}>
                <h1 className={styles.title}>
                  {article ? article.title : "بارگذاری مقاله..."}
                </h1>
                <div className={styles.article__header}>
                  <div className={styles.article__header__category}>
                    <i
                      className={`far fa-folder ${styles.article__header__icon}`}
                    ></i>
                    <Link to="#" className={styles.article__header__text}>
                      {articleCategory
                        ? articleCategory.title
                        : "بارگذاری دسته بندی..."}{" "}
                    </Link>
                  </div>
                  <div className={styles.article__header__category}>
                    <i
                      className={`far fa-user ${styles.article__header__icon}`}
                    ></i>
                    <span className={styles.article__header__text}>
                      {" "}
                      {article?.creator?.username}
                    </span>
                  </div>
                  <div className={styles.article__header__category}>
                    <i
                      className={`far fa-clock ${styles.article__header__icon}`}
                    ></i>
                    <span className={styles.article__header__text}>
                      {" "}
                      {article?.createdAt
                        ? new Date(article?.createdAt).toLocaleDateString(
                            "fa-IR"
                          )
                        : "بارگذاری تاریخ..."}
                    </span>
                  </div>
                  <div className={styles.article__header__category}>
                    <i
                      className={`far fa-eye ${styles.article__header__icon}`}
                    ></i>
                    <span className={styles.article__header__text}>
                      {" "}
                      {article?.views} بازدید
                    </span>
                  </div>
                </div>

                <img
                  src="/images/blog/1.jpg"
                  alt="Article Cover"
                  className={styles.article__banner}
                />
                <div className={styles.article__score}>
                  <div className={styles.article__score__container}>
                    <img
                      src="/images/svgs/star_fill.svg"
                      className={styles.article__score__icon}
                      alt="star"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className={styles.article__score__icon}
                      alt="star"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className={styles.article__score__icon}
                      alt="star"
                    />
                    <img
                      src="/images/svgs/star_fill.svg"
                      className={styles.article__score__icon}
                      alt="star"
                    />
                    <img
                      src="/images/svgs/star.svg"
                      className={styles.article__score__icon}
                      alt="star"
                    />
                  </div>
                  <span className={styles.article__score__text}>
                    4.2/5 - (5 امتیاز)
                  </span>
                </div>

                <p className={`paragraph ${styles.article__paragraph}`}>
                  {article ? (
                    article.description
                  ) : (
                    <>
                      "جاوا اسکریپت یکی از زبان‌های برنامه‌نویسی اصلی حوزه
                      فرانت‌اند است که به واسطه فریم ورک‌های آن می‌توان انواع وب
                      سایت‌ها، اپلیکیشن‌ها و وب اپلیکیشن‌ها را طراحی کرد. به طور
                      کلی بعد از یادگیری html و css معمولاً باید آموزش جاوا
                      اسکریپت را نیز فرا بگیرید. . چرا که این زبان تکمیل‌کننده
                      html و css بوده و در چنین شرایطی موقعیت‌های شغلی بیشتر را
                      در اختیار خواهید داشت و همچنین می‌توانید پروژه‌های
                      گسترده‌تری را انجام دهید. در حال حاضر با وجود منابع رایگان
                      موجود در وب شما به راحتی می‌توانید زبان جاوا اسکریپت را به
                      صورت حرفه‌ای فرا بگیرید. به همین واسطه در ادامه مطلب قصد
                      داریم سایت‌های شاخص آموزش این زبان برنامه‌نویسی در جهان را
                      به شما معرفی کنیم و در آخر بگوییم که بهترین سایت آموزش
                      جاوا اسکریپت کدام است."
                    </>
                  )}
                </p>

                <div className="article-read">
                  <span className="article-read__title">
                    آنچه در این مقاله خواهید خواند
                  </span>
                  <ul className="article-read__list">
                    <li className="article-read__item">
                      <Link to="#" className="article-read__link">
                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                      </Link>
                    </li>
                    <li className="article-read__item">
                      <Link to="#" className="article-read__link">
                        یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!
                      </Link>
                    </li>
                    <li className="article-read__item">
                      <Link to="#" className="article-read__link">
                        ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:
                      </Link>
                    </li>
                  </ul>
                </div>
                <img
                  src="/images/blog/2.jpg"
                  alt="ArticleImage"
                  className="article__seconadary-banner"
                />
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <Html testHtmlTemplate={article?.body} />
                  {/* <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p> */}
                  <img
                    src="/images/blog/4.png"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>

                <img
                  src="/images/blog/2.jpg"
                  alt="ArticleImage"
                  className="article__seconadary-banner"
                />
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/images/blog/4.png"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                </div>
                <div className="article-section">
                  <h2 className="article-section__title">
                    معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                  </h2>
                  <p className="paragraph article-section__text">
                    توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین
                    سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی
                    هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه
                    شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید
                    و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه
                    کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا
                    به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا
                    اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان
                    و به زبان فارسی این زبان را یاد بگیرید.
                  </p>
                  <img
                    src="/images/blog/3.jpg"
                    alt="article body img"
                    className="article-section__img"
                  />
                </div>

                <div className="article-social-media">
                  <span className="article-social-media__text">
                    اشتراک گذاری :
                  </span>
                  <Link to="#" className="article-social-media__link">
                    <i className="fab fa-telegram-plane article-social-media__icon"></i>
                  </Link>
                  <Link to="#" className="article-social-media__link">
                    <i className="fab fa-twitter article-social-media__icon"></i>
                  </Link>
                  <Link to="#" className="article-social-media__link">
                    <i className="fab fa-facebook-f article-social-media__icon"></i>
                  </Link>
                </div>
              </div>
              <CommentsTextArea />
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
