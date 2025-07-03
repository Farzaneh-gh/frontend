import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./contact.css";
import Input from "../../components/Form/Input";
import useForm from "../../hooks/useForm";
import {
  requiredValidator,
  mainValueValidator,
  maxValueValidator,
  emailValidator,
  phoneValidator,
} from "../../validators/rules";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
function Contact() {
  const navigate = useNavigate();
  const [formInputs, onChangeHandler] = useForm({
    inputs: {
      name: { value: "", isValid: false, id: "name" },
      email: { value: "", isValid: false, id: "email" },
      phone: { value: "", isValid: false, id: "phone" },
      message: { value: "", isValid: false, id: "message" },
    },
    formIsValid: false,
  });

  const handelSubmit = (event) => {
    event.preventDefault();
    if (!formInputs.formIsValid) {
   swal({
      title: "خطا در ثبت کامنت",
      text: "لطفا تمامی فیلد ها را پر کنید",
      icon: "error",
      button: "باشه",
    });
      return;
    }
    const message = {
      name: formInputs.inputs.name.value,
      email: formInputs.inputs.email.value,
      phone: formInputs.inputs.phone.value,
      body: formInputs.inputs.message.value,
    };
    try {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }).then((response) => {
        if (response.status === 201) {
          swal({
            title: "کامنت شما با موفقیت ثبت شد",
            icon: "success",
            confirmButtonText: "باشه",
          }).then(() => {
            navigate("/");
          });
        }
      });
    } catch (err) {
      if (err) {
        swal({
          title: "خطا در ثبت کامنت",
          text: err.message,
          icon: "error",
          button: "باشه",
        });
      }
    }
  };
  return (
    <>
      <Topbar />
      <Navbar />
      <section className="conatiner contact-container ">
        <div className="contact-form">
          <span className="title-contact">ارتباط با ما</span>
          <span className="subtitle-contact">
            نظر یا انتقادتو بنویس برامون &nbsp;{" "}
            <i className="fa fa-heart text-danger "></i>
          </span>
          <form className="form">
            <div className="form-group">
              <Input
                element="input"
                id="name"
                className="contact-form__username-input"
                type="text"
                placeholder="نام و نام خانوادگی"
                validationsArray={[
                  requiredValidator(), // اجباری
                  mainValueValidator(8), // حداقل 3 کاراکتر
                  maxValueValidator(60), // حداکثر 20 کاراکتر
                ]}
                onChange={onChangeHandler}
              />
              <i className="contact-form__username-icon fa fa-user"></i>
            </div>
            <div className="form-group">
              <Input
                element="input"
                id="email"
                className="contact-form__username-input"
                type="email"
                placeholder="آدرس ایمیل"
                onChange={onChangeHandler}
                validationsArray={[emailValidator(), requiredValidator()]} // ایمیل معتبر
              />
              <i className="contact-form__username-icon fa fa-envelope"></i>
            </div>
            <div className="form-group">
              <Input
                element="input"
                id="phone"
                className="contact-form__username-input"
                type="text"
                placeholder="شماره تماس"
                onChange={onChangeHandler}
                validationsArray={[phoneValidator()]} // شماره تماس معتبر
              />
              <i className="contact-form__username-icon fa fa-phone"></i>
            </div>
            <div className="form-group">
              <Input
                id="message"
                name="message"
                rows="4"
                required
                className="contact-form__message-input"
                placeholder="متن خود را وارد کنید"
                onChange={onChangeHandler}
                validationsArray={[
                  requiredValidator(), // اجباری
                  mainValueValidator(10), // حداقل 10 کاراکتر
                  maxValueValidator(500), // حداکثر 500 کاراکتر
                ]}
              ></Input>
            </div>
            <button
              type="submit"
              className={`submit-button  ${
                formInputs.formIsValid ? " " : "disabled"
              }`}   
              onClick={handelSubmit}
              disabled={!formInputs.formIsValid}

            >
              ارسال
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
