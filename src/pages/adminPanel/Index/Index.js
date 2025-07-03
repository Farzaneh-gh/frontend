import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import PAdminItem from "../../../components/AdminPanel/PAdminItem/PAdminItem";
import Cookies from "js-cookie";

import "./Index.css";

export default function Index() {

    const [infos, setInfos] = useState([])
    const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])
    const [adminName, setAdminName] = useState('')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/infos/p-admin`, {
      headers: {
        Authorization: `Bearer ${
          Cookies.get("user")
        }`,
      },
    })
      .then((res) => res.json())
      .then((pageInfo) => {
        console.log(pageInfo);
        setInfos(pageInfo.infos)
        setLastRegisteredUsers(pageInfo.lastUsers)
        setAdminName(pageInfo.adminName)
      });
  }, []);
  return (
    <>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-content-title">
            <span className="welcome">
              خوش آمدید<span className="name"> {adminName}</span>
            </span>
          </div>
          <div className="home-content-boxes">
            <div className="row">
              {infos.map((item, index) => (
                <PAdminItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Container className="my-5 shadow p-3">
        <h1>اخیرا ثبت نام شده</h1>
        <div className="table-responsive  mt-3">
          <table className="table table-striped text-center">
            <thead className="table-dark table-header">
              <tr>
                <th>شناسه</th>
                <th>نام و نام خانوادگی</th>
                <th>ایمیل</th>
              </tr>
            </thead>
            <tbody>
              {lastRegisteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
  
}
