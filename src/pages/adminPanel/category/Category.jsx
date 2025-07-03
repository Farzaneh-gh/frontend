import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Input from "../../../components/Form/Input";
import {
  requiredValidator,
  maxValueValidator,
} from "../../../validators/rules";
import useForm from "../../../hooks/useForm";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { Button, Modal } from "react-bootstrap";

function Category() {
  const [categories, setcategories] = useState([]);
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [formInputs, onChangeHandler] = useForm({
    inputs: {
      name: { value: "", isValid: false, id: "name" },
      shortName: { value: "", isValid: false, id: "shortName" },
    },
    formIsValid: false,
  });

  const getAllCategories = async () => {
    try {
      const respose = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/category`
      );
      const data = await respose.json();
      setcategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCaterory = async () => {
    const token = Cookies.get("user");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/category`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formInputs.inputs.name.value,
            name: formInputs.inputs.shortName.value,
          }),
        }
      );
      if (response.status === 201) {
        getAllCategories();
        formInputs.inputs.name.value = "";
        formInputs.inputs.shortName.value = "";
      }
    } catch (error) {
      swal({
        title: "خطا در افزودن دسته بندی",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const deleteCategory = async (id) => {
    const token = Cookies.get("user");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/category/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "خطا در حذف دسته بندی",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const editCategory = async () => {
    const token = Cookies.get("user");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/category/${categoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formInputs.inputs.name.value,
            name: formInputs.inputs.shortName.value,
          }),
        }
      );
      if (response.status === 200) {
        getAllCategories();
        setShow(false);
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "خطا در ویرایش دسته بندی",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="md"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="justify-content-center border-0 align-items-center">
          <Modal.Title className="fw-bold">
            عنوان جدید دسته بندی را وارد نمایید:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            id="name"
            element="input"
            onChange={onChangeHandler}
            validationsArray={[
              requiredValidator(), // اجباری
              maxValueValidator(60), // حداکثر 60 کاراکتر
            ]}
            type="text"
            placeholder="عنوان دسته بندی"
            className="login-form__password-input"
          />
          <Input
            id="shortName"
            element="input"
            onChange={onChangeHandler}
            validationsArray={[
              requiredValidator(), // اجباری
              maxValueValidator(60), // حداکثر 60 کاراکتر
            ]}
            type="text"
            placeholder="نام کوتاه دسته بندی"
            className="login-form__password-input"
          />
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button
            variant="secondary"
            onClick={() => setShow(false)}
            className="p-3"
          >
            بستن
          </Button>
          <Button variant="primary" className="p-3" onClick={editCategory}>
            افزودن
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="mt-5 shadow rounded-1">
        <Row className="p-3">
          <h1 className="mb-3 fw-bold">افزودن دسته‌بندی جدید</h1>
          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username  flex-sm-row flex-md-column align-items-start mb-1">
              <label className="input-title  mb-sm-0 me-sm-2 fw-bold">
                عنوان{" "}
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
                placeholder="لطفا عنوان را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
          </Col>
          <Col xs={12} md={6} className="mb-3">
            <div className="login-form__username  flex-sm-row flex-md-column align-items-start mb-1">
              <label className="input-title  mb-sm-0 me-sm-2 fw-bold">
                اسم کوتاه
              </label>
              <Input
                id="shortName"
                element="input"
                onChange={onChangeHandler}
                validationsArray={[
                  requiredValidator(), // اجباری
                  maxValueValidator(60), // حداکثر 60 کاراکتر
                ]}
                type="text"
                placeholder="لطفا اسم کوتاه را وارد کنید..."
                className="login-form__password-input"
              />
            </div>
          </Col>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary px-5 py-2 fw-bold fs-4"
              onClick={addCaterory}
            >
              افزودن
            </button>
          </div>
        </Row>
      </Container>

      <Container className="mt-5 shadow rounded-1">
        <div className="table-responsive p-3">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>شناسه</th>
                <th>عنوان</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => {
                        setShow(true);
                        setCategoryId(category._id);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => deleteCategory(category._id)}
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

export default Category;
