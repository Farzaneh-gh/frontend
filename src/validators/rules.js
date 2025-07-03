const requiredValue = "REQUIRED_VALUE";
const minValue = "MIN_VALUE";
const maxValue = "MAX_VALUE";
const emailValue = "EMAIL_VALUE";
const passwordValue = "PASSWORD";
const phoneValue = "PHONE_VALUE";


 const requiredValidator=()=>( {
  type: requiredValue,
  message: "این فیلد اجباری است",
});

const phoneValidator = () => ({
  type: phoneValue,
  message: "شماره تماس وارد شده صحیح نیست",
});
 const mainValueValidator=(min)=>({
  type: minValue,
  message: `حداقل ${min} کاراکتر مورد نیاز است`,
  min
});

 const maxValueValidator=(max)=>({
  type: maxValue,
  message: `حداکثر ${max} کاراکتر مجاز است`,
  max
});

const emailValidator=()=>({
  type: emailValue,
  message: "ایمیل وارد شده صحیح نیست",
});

const validationTypes = {
  requiredValue,
  minValue,
  maxValue,
  emailValue,
  passwordValue,
  phoneValue,
};

const passwordValidator = () => ({
  type: passwordValue,
  message:
    "رمز عبور باید حداقل ۸ کاراکتر و شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر ویژه مثل #?!@$%^&*- باشد.",
});
export default validationTypes;
export {
  requiredValidator,
  mainValueValidator,
  maxValueValidator,
  emailValidator,
  passwordValidator,
  phoneValidator
};