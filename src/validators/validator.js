import validationTypes from "./rules";
import { validateEmail, validatePassword , validatePhone} from "./regex";

const validators = (value, validationsArray) => {
  let errors = [];

  for (const validRuleObj of validationsArray) {
    const rule = validRuleObj.type;

    switch (rule) {
      case validationTypes.requiredValue:
        if (value.trim().length <= 0) {
          errors.push(validRuleObj.message);
        } else {
          errors = errors.filter((error) => error !== validRuleObj.message);
        }
        break;

      case validationTypes.emailValue:
        if (!validateEmail(value)) {
          errors.push(validRuleObj.message);
        } else {
          errors = errors.filter((error) => error !== validRuleObj.message);
        }
        break;

      case validationTypes.minValue:
        if (value.length < validRuleObj.min) {
          errors.push(validRuleObj.message);
        } else {
          errors = errors.filter((error) => error !== validRuleObj.message);
        }
        break;

      case validationTypes.maxValue:
        if (value.length > validRuleObj.max) {
          errors.push(validRuleObj.message);
        } else {
          errors = errors.filter((error) => error !== validRuleObj.message);
        }
        break;

      case validationTypes.passwordValue:
        if (!validatePassword(value)) {
          errors.push(validRuleObj.message);
        } else {
          errors = errors.filter((error) => error !== validRuleObj.message);
        }
        break;
      case validationTypes.phoneValue:
        if (!validatePhone(value)) {
          errors.push(validRuleObj.message);
        } else {
          errors = errors.filter((error) => error !== validRuleObj.message);
        } break;
      default:
        break;
    }
  }

  return errors;
};

export default validators;
