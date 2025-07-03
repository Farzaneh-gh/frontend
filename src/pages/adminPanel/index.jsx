/* import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../components/AdminPanel/Topbar/Topbar";
import "./index.css";
function index() {
  return (
    <div id="content" className="row ">
      <Sidebar />
      <div id="home" className="col-12 ">
        <Topbar />
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default index;
 */

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../components/AdminPanel/Topbar/Topbar";
import "./index.css";

function Index() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSodebar = () => {
    setShowSidebar(true);
  };
  const closeSidebar = () => {
    setShowSidebar(false);
  };
  useEffect(() => {
  }, [showSidebar]);


  
  return (
    <div className="d-flex flex-column flex-md-row">
      <div id="sidebar">
        <div
          className={`col-2 sidebar-container ${
            showSidebar ? "showSidebar" : ""
          }`}
        >
          <Sidebar closeSidebar={closeSidebar} />
        </div>
      </div>
      {/* Main Content */}
      <div id="home" className="col-12 col-md-10">
        <Topbar toggleSidebar={handleShowSodebar} />
        <div className="content-container p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Index;
