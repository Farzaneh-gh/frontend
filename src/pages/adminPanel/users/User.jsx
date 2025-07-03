/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./Users.css";
import AuthContext from "../../../contexts/authContext";
import { useContext } from "react";
import CircleSpinner from "../../../components/CircleSpinner/CircleSpinner";
import Pagination from "../../../components/Pagination/Pagination";
import swal from "sweetalert";
import { Container, Row, Col } from "react-bootstrap";
import Input from "../../../components/Form/Input";
import {
  requiredValidator,
  mainValueValidator,
  maxValueValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
} from "../../../validators/rules";
import useForm from "../../../hooks/useForm";
function User() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [formInputs, onChangeHandler] = useForm({
    inputs: {
      username: { value: "", isValid: false, id: "username" },
      name: { value: "", isValid: false, id: "name" },
      email: { value: "", isValid: false, id: "email" },
      phone: { value: "", isValid: false, id: "phone" },
      password: { value: "", isValid: false, id: "password" },
    },
    formIsValid: false,
  });

  const getAllUsers = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
        console.log("Users fetched successfully:", data);
      })

      .catch((error) => {
        console.error("Error in useEffect:", error);
      });
  };

  useEffect(() => {
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeUser = (id) => {
    swal({
      title: "آیا مطمئن هستید؟",
      text: "این کار قابل بازگشت نخواهد بود!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch users");
            }
            swal("کاربر با موفقیت حذف شد!", {
              icon: "success",
            });
            getAllUsers();
          })

          .catch((error) => {
            console.error("Error in useEffect:", error);
          });
      }
    });
  };

  const banUser = (id) => {
    swal({
      title: "آیا مطمئن هستید؟",
      text: "این کار قابل بازگشت نخواهد بود!",
      icon: "warning",
      buttons: ["خیر", "بله"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/ban/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          swal("کاربر با موفقیت بن شد!", {
            icon: "success",
          });
          getAllUsers();
        });
      }
    });
  };

  const registerNewUser=()=>{
    const body = {
      name: formInputs.inputs.name.value,
      username: formInputs.inputs.username.value,
      email: formInputs.inputs.email.value,
      phone: formInputs.inputs.phone.value,
      password: formInputs.inputs.password.value,
      confirmPassword: formInputs.inputs.password.value
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      
      if (response.status === 409) {
        swal({
          title: "خطا",
          text: "حساب کاربری قبلا ساخته شده است",
          icon: "error",
          button: "باشه",
        });
      }
      if (response.status === 400) {
        swal({
          title: "خطا",
          text: "درخواست نامعتبر",
          icon: "error",
          button: "باشه",
        });
      }
      if (response.status === 403) {
        swal({
          title: "خطا",
          text: "این شماره تماس مسدود شده",
          icon: "error",
          button: "باشه",
        });
      }
      else if (response.ok) {
        swal("کاربر با موفقیت ثبت شد!", {
          icon: "success",
        }).then(() => {
          formInputs.inputs.name.value = "";
          formInputs.inputs.username.value = "";
          formInputs.inputs.email.value = "";
          formInputs.inputs.phone.value = "";
          formInputs.inputs.password.value = "";
        });
        getAllUsers();
      } else {
        swal({
          title: "خطا",
          text: "مشکلی در ارتباط با سرور رخ داده است",
          icon: "error",
          button: "باشه",
        });
      }
    }).catch((error) => {
      console.error("Error in useEffect:", error);
      swal({
        title: "خطا",
        text: "خطا در ارتباط با سرور",
        icon: "error",
        button: "باشه",
      })
    });
  }
  return (
    <>
      <Container className="mb-5 border shadow">
        <Row className="p-3">
          <Col xs={12} md={6} className="mb-3">
            <div className=" ">
              <div className="name input">
                <div className="login-form__username">
                  <Input
                    element="input"
                    className="login-form__username-input"
                    type="text"
                    placeholder="نام و نام خانوادگی"
                    id="name"
                    validationsArray={[
                      requiredValidator(), // اجباری
                      mainValueValidator(8), // حداقل 3 کاراکتر
                      maxValueValidator(60), // حداکثر 20 کاراکتر
                    ]}
                    onChange={onChangeHandler}
                  />
                  <i className="login-form__username-icon fa fa-user"></i>
                </div>
              </div>
              <div className="login-form__username">
                <Input
                  type="text"
                  className="login-form__username-input"
                  id="username"
                  element="input"
                  validationsArray={[
                    requiredValidator(), // اجباری
                    mainValueValidator(8), // حداقل 3 کاراکتر
                    maxValueValidator(60), // حداکثر 20 کاراکتر
                  ]}
                  onChange={onChangeHandler}
                  placeholder="لطفا نام کاربری را وارد کنید..."
                />
                <i className="login-form__username-icon fa fa-user"></i>
              </div>

              <div className="login-form__username">
                <Input
                  type="password"
                  className="login-form__username-input"
                  id="password"
                  element="input"
                  validationsArray={[
                    requiredValidator(), // اجباری
                    passwordValidator(),
                  ]}
                  onChange={onChangeHandler}
                  placeholder="لطفا رمز عبور کاربر را وارد کنید..."
                />
                <i className="login-form__username-icon fa fa-lock"></i>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <div className="">
              {" "}
              <div className="login-form__password">
                <Input
                  element="input"
                  className="login-form__password-input"
                  type="text"
                  placeholder="آدرس ایمیل"
                  id="email"
                  validationsArray={[
                    requiredValidator(), // اجباری
                    emailValidator(),
                  ]}
                  onChange={onChangeHandler}
                />
                <i className="login-form__password-icon fa fa-envelope"></i>
              </div>
              <div className="login-form__password">
                <Input
                  element="input"
                  className="login-form__password-input"
                  type="text"
                  placeholder="شماره موبایل"
                  id="phone"
                  validationsArray={[
                    requiredValidator(), // اجباری
                    phoneValidator(),
                  ]}
                  onChange={onChangeHandler}
                />
                <i className="login-form__password-icon fa fa-phone"></i>
              </div>
            </div>
          </Col>
        </Row>
        <div className="text-center">
          <button
            className=" mb-3 p-3 px-5 py-3 register-button"
            onClick={registerNewUser}
          >
            ثبت کاربر
          </button>
        </div>
      </Container>
      <Container className="user-container">
        <h1 className="user-title">مدیریت کاربران</h1>

        <div className="table-responsive  ">
          <table className="table table-striped text-center">
            <thead className="table-dark table-header">
              <tr>
                <th>شناسه</th>
                <th>نام و نام خانوادگی</th>
                <th>ایمیل</th>
                <th className="d-none d-md-table-cell">ویرایش</th>
                <th className="d-none d-md-table-cell">حذف</th>
                <th className="d-none d-md-table-cell">بن</th>
                <th className="d-md-none">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {loading || users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <CircleSpinner />
                  </td>
                </tr>
              ) : (
                currentUsers.map((user, index) => (
                  <tr key={index}>
                    <th scope="row" className="fs-4">{index + 1}</th>
                    <td className="fs-4">{user.name}</td>
                    <td className="fs-4">{user.email}</td>

                    {/* Desktop buttons */}
                    <td className="d-none d-md-table-cell">
                      <button type="button" className="btn btn-primary btn-sm px-3">
                        ویرایش
                      </button>
                    </td>
                    <td className="d-none d-md-table-cell">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm px-3"
                        onClick={() => removeUser(user._id)}
                      >
                        حذف
                      </button>
                    </td>
                    <td className="d-none d-md-table-cell">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm px-3"
                        onClick={() => banUser(user._id)}
                      >
                        بن
                      </button>
                    </td>

                    {/* Mobile dropdown */}
                    <td className="d-md-none">
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary btn-sm dropdown-toggle text-center"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          عملیات
                        </button>
                        <ul className="dropdown-menu  shadow">
                          <li className="dropdown-item d-flex  align-items-center w-100">
                            <button
                              className="dropdown-item"
                              onClick={() => console.log("ویرایش", user._id)}
                            >
                              ویرایش
                            </button>
                            <i className="fa fa-edit fa-lg text-primary"></i>
                          </li>
                          <li className="dropdown-item d-flex  align-items-center w-100">
                            <button
                              className="dropdown-item"
                              onClick={() => removeUser(user._id)}
                            >
                              حذف
                            </button>
                            <i className="fa fa-trash fa-lg text-danger"></i>
                          </li>
                          <li className="dropdown-item d-flex  align-items-center w-100">
                            <button
                              className="dropdown-item"
                              onClick={() => banUser(user._id)}
                            >
                              بن
                            </button>
                            <i className="fa fa-ban fa-lg text-warning"></i>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          items={users}
          setItems={setCurrentUsers}
          pageSize={12}
          path="p-admin/users"
        />
      </Container>
    </>
  );
}

export default User;
