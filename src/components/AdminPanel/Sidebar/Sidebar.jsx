import React, { useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useRef } from "react";

import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
function Sidebar({ closeSidebar }) {
  const sidebarRef = useRef();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    swal({
      title: "خروج از پنل ادمین",
      text: "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        logout();
        navigate("/");
        swal({
          title: "خروج موفق",
          text: "شما با موفقیت از پنل ادمین خارج شدید.",
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeSidebar]);
   
  return (
    <>
      <div className="sidebar-header " ref={sidebarRef}>
        <img src="/images/logo/Logo.png" alt="Logo" />{" "}
      </div>

      <div className="sidebar-links">
        <ul>
          <li className="active-menu">
            <Link to="/p-admin" onClick={closeSidebar}>
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/courses" onClick={closeSidebar}>
              <span>دوره ها</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/sessions" onClick={closeSidebar}>
              <span> جلسات</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/menus" onClick={closeSidebar}>
              <span>منو ها</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/articles" onClick={closeSidebar}>
              <span>مقاله ها</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/users/1" onClick={closeSidebar}>
              <span>کاربران</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/discounts" onClick={closeSidebar}>
              <span>کدهای تخفیف</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/category" onClick={closeSidebar}>
              <span>دسته‌بندی‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/contacts" onClick={closeSidebar}>
              <span>پیغام‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="/p-admin/tickets" onClick={closeSidebar}>
              <span>تیکت‌ها</span>
            </Link>
          </li>
          <li className="logout" onClick={handleLogout}>
            <div>
              <span>خروج</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
