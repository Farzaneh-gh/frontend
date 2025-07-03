import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import swal from "sweetalert";
import { Modal, Button } from "react-bootstrap";
import Input from "../../../components/Form/Input";
import useForm from "../../../hooks/useForm";
import {
  requiredValidator,
  maxValueValidator,
} from "../../../validators/rules";
import Cookies from "js-cookie";

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [show, setShow] = useState(false);
  const [constactEmail, setContactEmail] = useState("");
  const [formInputs, onChangeHandler] = useForm({
    inputs: {
      answer: { value: "", isValid: false, id: "answer" },
    },
    formIsValid: false,
  });

  const getAllContacts = async () => {
    try {
      const respose = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/contact`
      );
      const data = await respose.json();
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAnswer = async () => {
    if (!formInputs.formIsValid) {
      swal({
        title: "خطا",
        text: "لطفا فرم را به درستی پر کنید",
        icon: "error",
        button: "باشه",
      });
      return;
    }
    try {
      const token = Cookies.get("user");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/contact/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: constactEmail,
            answer: formInputs.inputs.answer.value,
          }),
        }
      );
      if (response.status === 200) {
        swal({
          title: "موفق",
          text: "پاسخ شما با موفقیت ثبت شد",
          icon: "success",
          button: "باشه",
        })
        getAllContacts();
        setShow(false);
      }
    } catch (error) {
      swal({
        title: "خطا",
        text: "مشکلی پیش آمده است، لطفا دوباره تلاش کنید",
        icon: "error",
        button: "باشه",
      });
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const showContactBody = (body) => {
    swal({
      title: body,
      buttons: "اوکی",
    });
  };
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
          <Modal.Title className="fw-bold">افزودن پیغام</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            id="answer"
            element="textarea"
            onChange={onChangeHandler}
            cols="30"
            rows="5"
            validationsArray={[
              requiredValidator(), // اجباری
              maxValueValidator(200), // حداکثر 60 کاراکتر
            ]}
            type="textearea"
            placeholder=""
            className="login-form__password-input "
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
          <Button variant="primary" className="p-3" onClick={addAnswer}>
            ارسال
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="my-5 shadow p-3">
        <h1 className="text-center fs-2 mb-3">لیست پیغام‌ها </h1>
        <div className="table-responsive  mt-3">
          <table className="table table-hover">
            <thead className="table-dark table-header">
              <tr>
                <th scope="col">شناسه</th>
                <th scope="col">نام و نام خانوادگی </th>
                <th scope="col">ایمیل</th>
                <th scope="col"> شماره تماس </th>
                <th scope="col">مشاهده</th>
                <th scope="col">پاسخ</th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody className="fs-4">
              {contacts.map((contact, index) => (
                <tr>
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{contact.name}</td>
                  <td className="py-3">{contact.email}</td>
                  <td className="py-3">{contact.phone}</td>
                  <td className="py-3">
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={() => showContactBody(contact.body)}
                    >
                      مشاهده پیغام{" "}
                    </button>
                  </td>
                  <td className="py-3">
                    <button
                      type="button"
                      className="btn btn-success edit-btn"
                      onClick={() => {
                        setShow(true);
                        setContactEmail(contact.email);
                      }}
                    >
                      پاسخ
                    </button>
                  </td>
                  <td className="py-3">
                    <button type="button" className="btn btn-danger edit-btn">
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

export default Contact;
