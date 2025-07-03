import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/UserPanel/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Index.css";
function Index() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <section className="content">
        <div className="content-header">
          <div className="container">
            <span className="content-header__title">حساب کاربری من</span>
            <span className="content-header__subtitle">پیشخوان</span>
          </div>
        </div>
        <div className="content-main">
          <div className="container">
            <div className="row position-relative">
              <Sidebar />

              <Outlet />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Index;
