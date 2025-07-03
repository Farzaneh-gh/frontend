import React from "react";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import {
  requiredValidator,
  mainValueValidator,
  maxValueValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
} from "../../validators/rules";

import useForm from "../../hooks/useForm";
import AuthContext from "../../contexts/authContext";
import { useContext } from "react";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formInputs, onChangeHandler] = useForm({
    inputs: {
      username: { value: "", isValid: false, id: "username" },
      name: { value: "", isValid: false, id: "name" },
      email: { value: "", isValid: false, id: "email" },
      phone: { value: "", isValid: false, id: "phone" },
      password: { value: "", isValid: false, id: "password" },
      confirmPassword: { value: "", isValid: false, id: "confirmPassword" },
    },
    formIsValid: false,
  });

  const handleRegisterNewUser =async(e) => {
    e.preventDefault();

 const bodyData={
  name:formInputs.inputs.name.value,
  username:formInputs.inputs.username.value,
  email:formInputs.inputs.email.value,
  password:formInputs.inputs.password.value,
  phone:formInputs.inputs.phone.value,
  confirmPassword:formInputs.inputs.confirmPassword.value,
  
 }

try{
  const response = await fetch(`http://localhost:4000/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  const data=await response.json();
  if(response.status===201){
    login(data.user,data.accessToken);
    swal({
      title: `${data.user.name}`,
      text: "حساب کاربری شما با موفقیت ساخته شد",
      icon: "success",
      button: "باشه",
    }).then(() => {
      navigate("/");
    });
  }

  if(response.status===409){
    swal({
      title: "خطا",
      text: "حساب کاربری شما قبلا ساخته شده است",
      icon: "error",
      button: "باشه",
    });
  }

  if(response.status===400){

    swal({
      title: "خطا",
      text: `${data.message[0].message}`,
      icon: "error",
      button: "باشه",
    });
  }
  if(response.status===403){
    swal({
      title: "خطا",
     text:'این شماره تماس مسدود شده',
      icon: "error",
      button: "باشه",
    });
  }
}catch(err){
  console.log(err);
}

  };  
 
  
  return (
    <section className="login-register ">
      {" "}
      <div className="login register-form">
        <span className="login__title">ساخت حساب کاربری</span>
        <span className="login__subtitle">
          خوشحالیم قراره به جمع ما بپیوندی
        </span>
        <div className="login__new-member">
          <span className="login__new-member-text">
            قبلا ثبت‌نام کرده‌اید؟{" "}
          </span>
          <Button className="login__new-member-link" to="/login">
            وارد شوید
          </Button>
        </div>
        <form action="#" className="login-form">
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
          <div className="login-form__username">
            <Input
              element="input"
              className="login-form__username-input"
              type="text"
              placeholder="نام کاربری"
              id="username"
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
          <div className="login-form__password">
            <Input
              element="input"
              className="login-form__password-input"
              type="password"
              placeholder="رمز عبور"
              id="password"
              validationsArray={[
                requiredValidator(), // اجباری
                passwordValidator(),
              ]}
              onChange={onChangeHandler}
            />
            <i className="login-form__password-icon fa fa-lock-open"></i>
          </div>
          <div className="login-form__password">
            <Input
              element="input"
              className="login-form__password-input"
              type="password"
              placeholder="رمز عبور تکرار"
              id="confirmPassword"
              validationsArray={[
                requiredValidator(), // اجباری
                passwordValidator(),
              ]}
              onChange={onChangeHandler}
            />
            <i className="login-form__password-icon fa fa-lock-open"></i>
          </div>
          <Button
            className={`${
              formInputs.formIsValid
                ? "login-form__btn "
                : "login-form__btn disabled"
            }`}
            type="submit"
            disabled={!formInputs.formIsValid}
            onClick={handleRegisterNewUser}
          >
            <i className="login-form__btn-icon fa fa-user-plus"></i>
            <span className="login-form__btn-text">عضویت</span>
          </Button>
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

export default Register;
