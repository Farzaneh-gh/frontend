import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Input from "../../../components/Form/Input";
import {
  requiredValidator,
  maxValueValidator,
} from "../../../validators/rules";
import useForm from "../../../hooks/useForm";
import Select from "react-select";
import Cookies from "js-cookie";
import swal from "sweetalert";
function Courses() {
  const [addCourse, setAddCourse] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [courseCover, setCourseCover] = React.useState(null);
  const [courseStatus, setCourseStatus] = React.useState("start");
  const [categoryOptions, setCategoryOptions] = React.useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const [formInputs, onChangeHandler] = useForm({
    inputs: {
      name: { value: "", isValid: false, id: "name" },
      description: { value: "", isValid: false, id: "description" },
      shortName: { value: "", isValid: false, id: "shortName" },
      price: { value: "", isValid: false, id: "price" },
      support: { value: "", isValid: false, id: "support" },
    },
    formIsValid: false,
  });
 
  const getAllCourses = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/courses`
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

  const getAllCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/category`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategoryOptions(
        data.map((category) => ({ value: category._id, label: category.title }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    getAllCourses();
    getAllCategories();
  }, []);

  const handleAddCourse = async () => {
    if (!formInputs.formIsValid) {
      swal("لطفا فرم را به درستی پر کنید!", {
        icon: "warning",
      });
      return;
    }
    if(selectedCategoryId === null){
      swal("لطفا دسته بندی را انتخاب کنید!", {
        icon: "warning",
      });
      return;
    }
    let formData = new FormData();
    const token = Cookies.get("user");
    formData.append("name", formInputs.inputs.name.value);
    formData.append("description", formInputs.inputs.description.value);
    formData.append("shortName", formInputs.inputs.shortName.value);
    formData.append("price", formInputs.inputs.price.value);
    formData.append("categoryID", selectedCategoryId.value);
    formData.append("status", courseStatus);
    formData.append("cover", courseCover);
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/courses`,

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add course");
      }

      if (response.ok) {
        swal("دوره با موفقیت افزوده شد!", {
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    swal({
      title: "آیا مطمئن هستید؟",
      text: "این کار قابل بازگشت نخواهد بود!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const token = Cookies.get("user");
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/courses/${id}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to delete course");
          }
          swal("دوره با موفقیت حذف شد!", {
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error deleting course:", error);
          swal("خطا در حذف دوره!", {
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="d-flex justify-content-start d-sm-none">
        <button
          className="btn btn-primary mb-3 d-flex align-items-center justify-content-space-between p-3 gap-2"
          onClick={() => setAddCourse(true)}
        >
          افزودن دوره جدید <i className="fa fa-plus"></i>
        </button>
      </div>
      <Container
        className={`mb-5 border shadow p-3 d-sm-block ${
          addCourse ? "d-block" : "d-none"
        }`}
      >
        <div className="d-flex justify-content-between d-sm-none">
          <h1 className="mb-3 fw-bold text-primary">افزودن دوره جدید</h1>
          <i
            className="fa fa-close"
            onClick={() => setAddCourse(false)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <Row className="p-3">
          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username  flex-sm-row flex-md-column align-items-start mb-1">
              <label className="input-title  mb-sm-0 me-sm-2 fw-bold">
                نام دوره:
              </label>
              <Input
                id="name"
                element="input"
                onChange={onChangeHandler}
                validationsArray={[
                  requiredValidator(), // اجباری
                  maxValueValidator(60), // حداکثر 60 کاراکتر
                ]}
                type="text"
                placeholder="لطفا نام دوره را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
            <div className="login-form__username  flex-sm-row flex-md-column align-items-start mb-1">
              <label className="input-title  mb-sm-0 me-sm-2 fw-bold">
                Url دوره:
              </label>
              <Input
                id="shortName"
                element="input"
                onChange={onChangeHandler}
                validationsArray={[requiredValidator(), maxValueValidator(100)]}
                type="text"
                placeholder="لطفا توضیحات دوره را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
            <div className="login-form__username  flex-sm-row flex-md-column align-items-start mb-1">
              <label className="input-title  mb-sm-0 me-sm-2 fw-bold">
                قیمت دوره:
              </label>
              <Input
                id="price"
                element="input"
                onChange={onChangeHandler}
                validationsArray={[requiredValidator(), maxValueValidator(100)]}
                type="text"
                placeholder="لطفا قیمت دوره را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
            <div className="login-form__username  flex-sm-row flex-md-column align-items-start mb-1">
              <label className="input-title  mb-sm-0 me-sm-2 fw-bold">
                تصویر دوره:
              </label>
              <div className="d-flex mb-3">
                <input
                  type="file"
                  className="form-control p-3"
                  id="file"
                  onChange={(e) => setCourseCover(e.target.files[0])}
                />
                {/* <button className="btn border radius-0 d-flex align-items-center">
                  <i className="fa fa-upload fs-4 text-primary"></i>
                </button> */}
              </div>
            </div>
            <div className="form-check d-flex flex-column">
              <h3 className="input-title mb-sm-0 me-sm-2 fw-bold">وضعیت دوره:</h3>

              <div className="d-flex justify-content-between mt-3">
                <div>
                  <input
                    className="form-check-input shadow"
                    type="radio"
                    name="courseStatus"
                    id="statusOngoing"
                    value="presell"
                    onInput={(e) => setCourseStatus(e.target.value)}
                  />
                  <label
                    className="input-title mb-sm-0 me-sm-2 fs-4 "
                    for="statusOngoing"
                  >
                    در حال برگزاری
                  </label>
                </div>

                <div>
                  <input
                    className="form-check-input shadow"
                    type="radio"
                    name="courseStatus"
                    id="statusPresale"
                    value="start"
                    onInput={(e) => setCourseStatus(e.target.value)}
                  />
                  <label
                    className="input-title mb-sm-0 me-sm-2 fs-4"
                    for="statusPresale"
                  >
                    پیش فروش
                  </label>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6} className="mb-3 d-flex flex-column">
            <div className="login-form__username  flex-sm-row flex-md-column align-items-start mb-1">
              <label className="input-title  mb-sm-0 me-sm-2 fw-bold">
                توضیحات دوره:
              </label>
              <Input
                id="description"
                element="input"
                onChange={onChangeHandler}
                validationsArray={[requiredValidator(), maxValueValidator(100)]}
                type="text"
                placeholder="لطفا توضیحات دوره را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
            <div className="login-form__username  flex-sm-row flex-md-column align-items-start mb-3">
              <label className="input-title  mb-sm-0 me-sm-2 fw-bold">
                نحوه پشتیبانی دوره:
              </label>
              <Input
                id="support"
                element="input"
                onChange={onChangeHandler}
                validationsArray={[requiredValidator(), maxValueValidator(100)]}
                type="text"
                placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                className="login-form__password-input"
              />
            </div>

            <div className="d-flex mb-3 flex-column">
              <label className="input-title mb-1 fw-bold">
                دسته‌بندی دوره:
              </label>
              <Select
                options={categoryOptions}
                value={selectedCategoryId}
                onChange={(optionId) => setSelectedCategoryId(optionId)}
                placeholder="لطفا دسته بندی را انتخاب نمایید"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: "1px",
                    fontSize: "14px",
                    direction: "rtl",
                  }),
                }}
              />
            </div>
            {/*    <div className="d-flex mb-3 flex-column">
              <label className="input-title mb-1 fw-bold">
                {" "}
                دسته‌بندی دوره:
              </label>
              <select
                className="form-select p-3 mb-3 "
                aria-label="Default select example"
                dir="ltr"
              >
                <option value="-1">لطفا دسته بندی را انتخاب نمایید</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div> */}

            <div className="mt-auto  text-center ">
              <button
                className="btn btn-primary  px-5 py-2 fs-4 "
                onClick={handleAddCourse}
              >
                ثبت دوره
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
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th>لینک</th>
                <th>دسته بندی</th>
                <th>مدرس</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody className="fs-4">
              {courses.map((course, index) => (
                <tr key={index}>
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{course.name}</td>
                  <td className="py-3">
                    {course.price === 0
                      ? "رایگان"
                      : course.price.toLocaleString()}
                  </td>
                  <td className="py-3">
                    {course.isComplete === 0 ? "در حال برگزاری" : "تکمیل شده"}
                  </td>
                  <td className="py-3">{course.shortName}</td>
                  <td className="py-3">{course.categoryID.title}</td>
                  <td className="py-3">{course.creator}</td>
                  <td className="py-3">
                    <button type="button" className="btn btn-primary edit-btn">
                      ویرایش
                    </button>
                  </td>
                  <td className="py-3">
                    <button type="button" className="btn btn-danger delete-btn" onClick={() => handleDeleteCourse(course._id)}>
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

export default Courses;
