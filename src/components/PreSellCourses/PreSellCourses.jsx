import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import Styles from "./PreSellCourses.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from "../CourseBox/CourseBox";

import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const PreSellCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
   fetch(`${process.env.REACT_APP_BACKEND_URL}/courses/presell`)
     .then((response) => response.json())
     .then((data) => {
       const lastData =data.slice(0, 6); // Limit to 6 courses
       setCourses(lastData);
   
     })
     .catch((error) =>
       console.error("Error fetching pre-sell courses:", error)
     );
  }, []);

  return (
    <div className={Styles.preSellCourses}>
      <div className="container">
        <SectionHeader
          title="دوره های پیش فروش"
          desc="دوره های پیش فروش ما با کیفیت و پشتیبانی بالا ارائه میشوند !"
        />
        <div className="container mt-5 mb-5">
          <div className="row">
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
            >
              {courses.map((course) => (
                <SwiperSlide key={course.id}>
                  <CourseBox course={course} colNumber="col-11" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreSellCourses;
