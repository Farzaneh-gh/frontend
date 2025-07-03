import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Form/Input";
import "./Login.css";
import Button from "../../components/Form/Button";
import {
  requiredValidator,
  mainValueValidator,
  maxValueValidator,
} from "../../validators/rules";

import useForm from "../../hooks/useForm";
import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const { login } = useContext(AuthContext);
  const [isGoogleRecaptchaVerify, setIsGoogleRecaptchaVerify] =
    React.useState(false);

  const navigate = useNavigate();
  const [formInputs, onChangeHandler] = useForm({
    inputs: {
      username: { value: "", isValid: false, id: "username" },
      password: { value: "", isValid: false, id: "password" },
    },
    formIsValid: false,
  });

  const handleSignIn = async (e) => {
    e.preventDefault();

    const bodyData = {
      identifier: formInputs.inputs.username.value,
      password: formInputs.inputs.password.value,
    };
    if (!isGoogleRecaptchaVerify) {
      swal({
        title: "خطا",
        text: "لطفا قبل از ورود به حساب کاربری، ریکپچا را تکمیل کنید.",
        icon: "error",
        button: "باشه",
      });
      return;
    }
    if (!formInputs.formIsValid) {
      swal({
        title: "خطا",
        text: "لطفا فرم را به درستی پر کنید.",
        icon: "error",
        button: "باشه",
      });
      return;
    }
    try {
      const rsponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );
      const data = await rsponse.json();
      if (!rsponse.ok) {
        throw new Error("نام کاربری یا رمز عبور اشتباه است");
      } else {
        login({}, data.accessToken);
        navigate("/");
      }
    } catch (err) {
      swal({
        title: "خطا",
        text: err.message,
        icon: "error",
        button: "باشه",
      });
    }
  };

  const onChangeHandlerGoogleRecaptcha = () => {
    setIsGoogleRecaptchaVerify(true);
  };


  return (
    <section className="login-register">
      <div className="login">
        <span className="login__title">ورود به حساب کاربری</span>
        <span className="login__subtitle">
          خوشحالیم دوباره میبینیمت دوست عزیز :)
        </span>
        <div className="login__new-member">
          <span className="login__new-member-text">کاربر جدید هستید؟</span>
          <Button className="login__new-member-link" to="/register">
            ثبت نام
          </Button>
        </div>
        <form action="#" className="login-form">
          <div className="login-form__username">
            <Input
              id="username"
              element="input"
              className="login-form__username-input"
              type="text"
              placeholder="نام کاربری یا آدرس ایمیل"
              validationsArray={[
                requiredValidator(), // اجباری
                mainValueValidator(8), // حداقل 3 کاراکتر
                maxValueValidator(60), // حداکثر 20 کاراکتر
              ]}
              onChange={onChangeHandler}
            />

            <i className="login-form__username-icon fa fa-user"></i>
          </div>
          <div className="login-form__password">
            <Input
              id="password"
              element="input"
              className="login-form__password-input"
              type="password"
              placeholder="رمز عبور"
              onChange={onChangeHandler}
              validationsArray={[
                requiredValidator(), // اجباری
              ]}
            />
            <i className="login-form__password-icon fa fa-lock-open"></i>
          </div>
          <div className=" recaptcha-parent">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onChangeHandlerGoogleRecaptcha}
            />
            ,
          </div>
          <Button
            className={`${
              formInputs.formIsValid
                ? "login-form__btn "
                : "login-form__btn disabled"
            }`}
            type="submit"
            disabled={!formInputs.formIsValid}
            onClick={handleSignIn}
          >
            <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
            <span className="login-form__btn-text">ورود</span>
          </Button>
          <div className="login-form__password-setting">
            <label className="login-form__password-remember">
              <input
                className="login-form__password-checkbox"
                type="checkbox"
              />
              <span className="login-form__password-text">
                مرا به خاطر داشته باش
              </span>
            </label>
            <label className="login-form__password-forget">
              <Link className="login-form__password-forget-link" to="#">
                رمز عبور را فراموش کرده اید؟
              </Link>
            </label>
          </div>
        </form>
        <div className="login__des">
          <span className="login__des-title">سلام کاربر محترم:</span>
          <ul className="login__des-list">
            <li className="login__des-item">
              لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس استفاده
              کنید.
            </li>
            <li className="login__des-item">
              ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
            </li>
            <li className="login__des-item">
              لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Login;
