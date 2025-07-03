import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header/Header";
import LastCourses from "../../components/LastCourses/LastCourses";
import AboutUs from "../../components/AboutUs/AboutUs";
import PopularCourses from "../../components/PopularCourses/PopularCourses";
import PreSellCourses from "../../components/PreSellCourses/PreSellCourses";
import LastArticles from "../../components/LastArticles/LastArticles";
import Footer from "../../components/Footer/Footer"
const Index = () => {
  return (
    <div>
      <Header />
       <LastCourses />
      <AboutUs />
      <PopularCourses />
      <PreSellCourses />
      <LastArticles />
      <Footer /> 
    </div>
  );
};

export default Index;
