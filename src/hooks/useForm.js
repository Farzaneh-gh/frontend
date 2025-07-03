import {  useCallback, useReducer } from "react";
const formReducer = (state, action) => {
  
    switch (action.type) {
        
        case "CHANGE":{
            let formIsValid = true;
           for(const input in state.inputs){
            if(input===action.inputName){
                formIsValid = formIsValid && action.isValid;
            }else{
                formIsValid = formIsValid && state.inputs[input].isValid;
            }
           }
           return {
             ...state,
             inputs: {
               ...state.inputs,
               [action.inputName]: {
                 ...state.inputs[action.inputName],
                 value: action.value,
                 isValid: action.isValid,
               },
             },
             formIsValid: formIsValid,
           };
           
        }
           
        default:
            return state;
    }
}
export default function useForm(initialInputs) {
  const [formInputs,dispatch]=useReducer(formReducer,initialInputs);
const onChangeHandler=useCallback((inputName,value,isValid)=>{
  dispatch({
    type:"CHANGE",
    inputName,
    value,
    isValid
   
  })
},[]);
if(!formInputs){
  return [formInputs,onChangeHandler];
}
return [formInputs, onChangeHandler];



}