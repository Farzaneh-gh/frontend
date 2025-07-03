import React from "react";
import FooterItem from "../FooterItem/FooterItem";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
const Footer = () => {
  return (
    <div className="container">
      <div className={styles.footer}>
        <div className="row">
          <FooterItem title="درباره ما">
            <p className={styles.footerText}>
              وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در
              فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول
              بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و فنی
              قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم! و خب
              امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی
              فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون
              رو نداره و باید از فیلترینگ های خاص آکادمی سبزلرن رد شه! این به
              این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با دانشجو
              بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو
              به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره
              های رایگان شون هم هزینه دریافت میکنند و متعهد هستند که هوای کاربر
              های عزیز رو داشته باشند !
            </p>
          </FooterItem>

          <FooterItem title="آخرین مطالب">
            <div className={styles.footerLinks}>
              <Link to="#" className={styles.footerLink}>
                نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
              </Link>
              <Link to="#" className={styles.footerLink}>
                چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن پایتون
              </Link>
              <Link to="#" className={styles.footerLink}>
                آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به
                گام و تصویری
              </Link>
              <Link to="#" className={styles.footerLink}>
                بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی
                معایب و مزایا
              </Link>
              <Link to="#" className={styles.footerLink}>
                معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش
                رایگان
              </Link>
            </div>
          </FooterItem>

          <FooterItem title="دسترسی سریع">
            <div className="row">
              <div className="col-6">
                <Link to="#" className={styles.footerLink}>
                  آموزش HTML
                </Link>
              </div>

              <div className="col-6">
                <Link to="#" className={styles.footerLink}>
                  آموزش CSS
                </Link>
              </div>

              <div className="col-6">
                <Link to="#" className={styles.footerLink}>
                  آموزش جاوا اسکریپت
                </Link>
              </div>
              <div className="col-6">
                <Link to="#" className={styles.footerLink}>
                  آموزش بوت استرپ
                </Link>
              </div>
              <div className="col-6">
                <Link to="#" className={styles.footerLink}>
                  آموزش ریکت
                </Link>
              </div>

              <div className="col-6">
                <Link to="#" className={styles.footerLink}>
                  آموزش پایتون
                </Link>
              </div>
            </div>
          </FooterItem>
        </div>
      </div>

      <div>
        <div className={styles.copyright}>
          <span>
            کلیه حقوق برای آکادمی آموزش برنامه نویسی سبز لرن محفوظ است.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
