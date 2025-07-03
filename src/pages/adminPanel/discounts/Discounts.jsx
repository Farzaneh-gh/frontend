import React from "react";
import { useState, useEffect } from "react";
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

function Discounts() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [discounts, setDiscounts] = useState([]);
  const [formInputs, onInputHandler] = useForm({
    inputs: {
      code: {
        value: "",
        isvalid: false,
        id: "code",
      },
      percent: {
        value: "",
        isvalid: false,
        id: "percent",
      },
      max: {
        value: "",
        isvalid: false,
        id: "max",
      },
    },
    formIsValid: false,
  });
  const getAllCourses = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/courses`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      setCourses(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const createDiscount = async () => {
    if (!formInputs.formIsValid || !courseId) {
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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/offs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            code: formInputs.inputs.code.value,
            percent: formInputs.inputs.percent.value,
            max: formInputs.inputs.max.value,
            course: courseId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create discount");
      }

      swal({
        title: "موفق",
        text: "تخفیف با موفقیت ایجاد شد",
        icon: "success",
        button: "باشه",
      });
      formInputs.inputs.code.value = "";
      formInputs.inputs.percent.value = "";
      formInputs.inputs.max.value = "";
      setCourseId("");
    } catch (error) {
      console.error("Error creating discount:", error);
      swal({
        title: "خطا",
        text: "خطایی در ایجاد تخفیف رخ داد",
        icon: "error",
        button: "باشه",
      });
    }
  };

  const getAllDiscounts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/offs`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("user")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch discounts");
      }
      const data = await response.json();
      setDiscounts(data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };
  const deleteDiscount = (discountId) => {
    swal({
      title: "آیا مطمئن هستید؟",
      text: "آیا مطمئن هستید که میخواهید این تخفیف را حذف کنید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/offs/${discountId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${Cookies.get("user")}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete discount");
          }
          swal({
            title: "موفق",
            text: "تخفیف با موفقیت حذف شد",
            icon: "success",
            button: "باشه",
          });
          getAllDiscounts();
        } catch (error) {
          console.error("Error deleting discount:", error);
          swal({
            title: "خطا",
            text: "خطایی در حذف تخفیف رخ داد",
            icon: "error",
            button: "باشه",
          });
        }
      }
    });
  };
  useEffect(() => {
    getAllCourses();
    getAllDiscounts();
  }, []);
  return (
    <>
      <Container fluid className="admin-panel rounded-3 shadow p-4">
        <div className="home-title mb-4">
          <span className="fs-3">افزودن تخفیف جدید</span>
        </div>

        <Row>
          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username flex-sm-row flex-md-column align-items-start mb-3">
              <label className="input-title fw-bold">عنوان کد تخفیف:</label>
              <Input
                element="input"
                onChange={onInputHandler}
                type="text"
                id="code"
                validationsArray={[
                  requiredValidator(),
                  mainValueValidator(3),
                  maxValueValidator(50),
                ]}
                placeholder="لطفا نام کد تخفیف را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username flex-sm-row flex-md-column align-items-start mb-3">
              <label className="input-title fw-bold">درصد تخفیف:</label>
              <Input
                element="input"
                onChange={onInputHandler}
                type="text"
                id="percent"
                validationsArray={[requiredValidator()]}
                placeholder="لطفا نام درصد تخفیف را وارد کنید..."
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
                  setCourseId(selectedOption.value);
                }}
              ></Select>
              <span className="error-message text-danger"></span>
            </div>
          </Col>

          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username flex-sm-row flex-md-column align-items-start mb-3">
              <label className="input-title fw-bold">حداکثر استفاده:</label>
              <Input
                element="input"
                onChange={onInputHandler}
                type="text"
                id="max"
                validationsArray={[requiredValidator()]}
                placeholder="لطفا حداکثر استفاده را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
          </Col>

          <Col className="col-12 mt-4">
            <div className="text-center">
              <button
                className="btn btn-primary px-5 py-2 fs-5"
                type="submit"
                onClick={createDiscount}
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
                <th>کد</th>
                <th>درصد</th>
                <th>حداکثر استفاده</th>
                <th>دفعات استفاده</th>
                <th>سازنده</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody className="fs-4 table-body text-center vertical-align-middle">
              {discounts.map((off, index) => (
                <tr key={off._id}>
                  <td>{index + 1}</td>
                  <td>{off.code}</td>
                  <td>{off.percent}</td>
                  <td>{off.max}</td>
                  <td>{off.uses}</td>
                  <td>{off.creator}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => deleteDiscount(off._id)}
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

export default Discounts;
