import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../contexts/authContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handelLoggout = (event) => {
    event.preventDefault();
    swal({
      title: "با موفقیت لاگ‌آوت شدین",
      icon: "success",
      buttons: "اوکی",
    }).then(() => {
      authContext.logout();
      navigate("/");
    });
  };
  return (
    <div className="col-3 border-right ">
      <div className="sidebar">
        <span className="sidebar__name">
          {" "}
          {authContext.userInfos?.name || "کاربر"}
        </span>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/my-account">
              {" "}
              پیشخوان{" "}
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/my-account/orders">
              {" "}
              سفارش‌ها{" "}
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/my-account/edit-account">
              {" "}
              جزئیات حساب کاربری{" "}
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/my-account/buyed">
              {" "}
              دوره های خریداری شده{" "}
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to="/my-account/tickets">
              {" "}
              تیکت های پشتیبانی{" "}
            </Link>
          </li>

          <li className="sidebar__item">
            <a className="sidebar__link" href="#" onClick={handelLoggout}>
              خروج از سیستم
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
