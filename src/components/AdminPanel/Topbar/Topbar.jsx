import React, { useEffect, useState } from "react";
import "./Topbar.css";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";

function Topbar({ toggleSidebar }) {
  const token = Cookies.get("user");
  const [userInfos, setUserInfos] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSwitchChange = (event, id) => {
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications/see/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (!response.ok) throw new Error("Failed to update status");
        window.location.reload();
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!token) window.location.href = "/";
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) window.location.href = "/";
        return res.json();
      })
      .then((data) => {
        if (data.role !== "ADMIN") window.location.href = "/";
        setUserInfos(data);
        setNotifications(data.notifications || []);
      })
      .catch(() => (window.location.href = "/"));
  }, [token]);

  return (
    <div className="container-fluid">
      <div className="container topbar-container px-3 py-3 py-md-4">
        <div className="d-flex justify-content-between align-items-center gap-3 ">
          {/* hamburger button */}
          <button
       
            className="btn btn-outline-dark d-md-none "
            onClick={(e) => {
              e.stopPropagation(); // Prevents click event bubbling to document listener
              toggleSidebar();
            }}
          >
            ☰
          </button>

          <div className="d-flex align-items-center  justify-content-end justify-content-md-between gap-3 w-100">
            {/* search */}
            <div className="home-searchbar d-none d-md-block">
              <input
                type="text"
                className="search-bar"
                placeholder="جستجو..."
              />
            </div>

            {/* notifications */}
            <div
              className="home-notification ms-auto "
              onMouseEnter={() => setShowNotifications(true)}
              onMouseLeave={() => setShowNotifications(false)}
            >
              <button type="button">
                <i className="far fa-bell"></i>
              </button>
              <div
                className={`home-notification__dropdown ${
                  showNotifications ? "show" : ""
                }`}
              >
                <ul className="home-notification__list">
                  {notifications.length === 0 ? (
                    <li className="home-notification__item">
                      <span className="home-notification__text">
                        هیچ اطلاعیه‌ای وجود ندارد
                      </span>
                    </li>
                  ) : (
                    notifications.map((notification, index) => (
                      <li key={index} className="home-notification__item">
                        <span className="home-notification__text">
                          {notification.msg}
                        </span>
                        <Form>
                          <Form.Check
                            type="switch"
                            id={`switch-${notification._id}`}
                            onChange={(e) =>
                              handleSwitchChange(e, notification._id)
                            }
                          />
                        </Form>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            {/* user info */}
            <div className="d-flex align-items-center gap-2">
              <span className="topbar__user-name d-md-block">
                {userInfos?.name}
              </span>
              <img
                src={userInfos?.profile || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="topbar__user-avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
