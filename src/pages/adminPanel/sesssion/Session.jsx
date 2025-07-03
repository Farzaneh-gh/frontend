import React, { useState, useEffect } from "react";
import useForm from "../../../hooks/useForm";
import Input from "../../../components/Form/Input";
import { Container, Row, Col } from "react-bootstrap";
import {
  requiredValidator,
  maxValueValidator,
  mainValueValidator,
} from "../../../validators/rules";
import Select from "react-select";
import swal from "sweetalert";
import Cookies from "js-cookie";
function Session() {
  const [courses, setCourses] = useState([]);
  const [sessionVideo, setSessionVideo] = useState({});
  const [sessions, setSessions] = useState([]);
  const [isSessionFree, setIsSessionFree] = useState(0);
  const [sessionCourse, setSessionCourse] = useState("");
  const [formInputs, onInputHandler] = useForm({
    inputs: {
      title: {
        value: "",
        id: "title",
        isValid: false,
      },
      time: {
        value: "",
        id: "time",
        isValid: false,
      },
    },
    formIsValid: false,
  });
  const getAllSessions = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/courses/sessions`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCourses = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/courses`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    setCourses(data);
  };

  const createSession = async () => {
    if (!formInputs.formIsValid || !sessionVideo || !sessionCourse) {
      swal({
        title: "خطا",
        text: "لطفا تمامی فیلد ها را پر کنید",
        icon: "error",
        button: "باشه",
      });
      return;
    }
    try {
      const token = Cookies.get("user");
      const formData = new FormData();
      formData.append("title", formInputs.inputs.title.value);
      formData.append("time", Number(formInputs.inputs.time.value));
      formData.append("video", sessionVideo);
      formData.append("free", isSessionFree);

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/courses/${sessionCourse}/sessions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      getAllSessions();

      swal({
        title: "موفقیت",
        text: "جلسه با موفقیت ایجاد شد",
        icon: "success",
        button: "باشه",
      });
    } catch (error) {
      console.error("Error creating session:", error);
      swal({
        title: "خطا",
        text: "خطایی در ایجاد جلسه رخ داد",
        icon: "error",
        button: "باشه",
      });
    }
  };

  const removeSession = (sessionID) => {
    const token = Cookies.get("user");

    swal({
      title: "آیا از حذف جلسه اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(
          `${process.env.REACT_APP_BACKEND_URL}/courses/sessions/${sessionID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => {
          if (res.ok) {
            swal({
              title: "جلسه مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then((result) => {
              getAllSessions();
            });
          }
        });
      }
    });
  };
  useEffect(() => {
    getAllCourses();
    getAllSessions();
  }, []);

  return (
    <>
      <Container fluid className="admin-panel rounded-3 shadow p-4">
        <div className="home-title mb-4">
          <span className="fs-3">افزودن جلسه جدید</span>
        </div>

        <Row>
          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username flex-sm-row flex-md-column align-items-start mb-3">
              <label className="input-title fw-bold">عنوان جلسه:</label>
              <Input
                element="input"
                onChange={onInputHandler}
                type="text"
                id="title"
                validationsArray={[
                  requiredValidator(),
                  mainValueValidator(3),
                  maxValueValidator(50),
                ]}
                placeholder="لطفا نام جلسه را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username flex-sm-row flex-md-column align-items-start mb-3">
              <label className="input-title fw-bold">مدت زمان جلسه:</label>
              <Input
                element="input"
                onChange={onInputHandler}
                type="text"
                id="time"
                validationsArray={[requiredValidator()]}
                placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username flex-sm-row flex-md-column align-items-start mb-3">
              <label
                className="input-title fw-bold mb-3"
                style={{ display: "block" }}
              >
                دوره:
              </label>
              <Select
                options={courses.map((course) => ({
                  value: course._id,
                  label: course.name,
                }))}
                onChange={(selectedOption) => {
                  setSessionCourse(selectedOption.value);
                }}
              ></Select>
              <span className="error-message text-danger"></span>
            </div>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username flex-sm-row flex-md-column align-items-start mb-3">
              <label className="input-title fw-bold mb-3">آپلود ویدیو:</label>
              <input
                type="file"
                className="form-control p-3"
                onChange={(event) => setSessionVideo(event.target.files[0])}
              />
              <span className="error-message text-danger"></span>
            </div>
          </Col>

          <Col cxs={12} md={6} className="mb-3">
            <h5 className="input-title fw-bold mb-3">وضعیت جلسه:</h5>
            <div className="d-flex justify-content-between mt-3">
              <div>
                <input
                  className="form-check-input shadow"
                  type="radio"
                  value="0"
                  name="condition"
                  onInput={(event) => setIsSessionFree(event.target.value)}
                />
                <label className="input-title me-2">غیر رایگان</label>
              </div>
              <div>
                <input
                  className="form-check-input shadow"
                  type="radio"
                  value="1"
                  name="condition"
                  onInput={(event) => setIsSessionFree(event.target.value)}
                />
                <label className="input-title me-2">رایگان</label>
              </div>
            </div>
          </Col>

          <Col className="col-12 mt-4">
            <div className="text-center">
              <button
                className="btn btn-primary px-5 py-2 fs-5"
                type="submit"
                onClick={createSession}
              >
                افزودن
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="my-5 shadow p-3">
        <h1>لیست دوره‌ها</h1>
        <div className="table-responsive  mt-3">
          <table className="table table-striped text-center">
            <thead className="table-dark table-header">
              <tr>
                <th>شناسه</th>
                <th>عنوان</th>
                <th>تایم</th>
                <th>دوره</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody className="fs-4">
              {sessions.map((session, index) => (
                <tr key={session._id}>
                  <td>{index + 1}</td>
                  <td>{session.title}</td>
                  <td>{session.time}</td>
                  <td>{session.course.name}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => removeSession(session._id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}

export default Session;
