import React, { useEffect } from "react";
import { useReducer } from "react";
import validators from "../../validators/validator";
const inputReducer = (state, action) => {
  const {value,validationsArray,type} = action;
  switch (type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        errors: validators(value, validationsArray),
        isvalid: validators(value,validationsArray).length === 0
      };

    default:
      return state;
  }
};

function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    errors: props.errors || [],
    isvalid:false,
  });


  useEffect(() => {
    if (props.value !== undefined) {
      dispatch({
        type: "CHANGE",
        value: props.value,
        validationsArray: props.validationsArray,
      });
    }
  }, [props.value]);

  const handleChangeValue = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validationsArray: props.validationsArray,
    });
  };
  

  useEffect(() => {
    props.onChange(props.id, inputState.value, inputState.isvalid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState.value]);




  const element =
    props.element === "input" ? (
      <>
        <input
          value={inputState.value}
          className={`${props.className} ${
            inputState.errors.length > 0 ? "border-danger" : ""
          }`}
          type={props.type}
          placeholder={props.placeholder}
          onChange={handleChangeValue}
        />
        {inputState.errors.map((error) => (
          <span className="text-danger fs-6 d-block">{error}</span>
        ))}
      </>
    ) : (
      <>
        <textarea
        cols={props.cols}
        rows={props.rows}
          value={inputState.value}
          className={`${props.className} ${
            inputState.errors.length > 0 ? "border-danger" : ""
          }`}
          placeholder={props.placeholder}
          onChange={handleChangeValue}
        ></textarea>
        {inputState.errors.map((error) => (
          <span className="text-danger fs-6 d-block">{error}</span>
        ))}
      </>
    );
  return <>{element}</>;
}

export default Input;
