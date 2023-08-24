import { useState } from "react";

const useInput=(validateFun)=>{
    const [inputValue,setInputValue]=useState("");
    const [isTouched,setIsTouched]=useState(false);

    const isValid=validateFun(inputValue);

    const hasError=isTouched && !isValid;

    const handleChange=(event)=>{
        setInputValue(event.target.value);
    };
    const handleBlur=(event)=>{
        setIsTouched(true);
    };

    const resetValue=()=>{
        setIsTouched(false);
        setInputValue("");
    };

    return {
        inputValue,
        isValid,
        hasError,
        handleChange,
        handleBlur,
        resetValue,
    }

};
export default useInput;