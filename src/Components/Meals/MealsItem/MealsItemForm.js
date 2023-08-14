import React,{useRef,useState} from "react";

import classes from "./MealsItemForm.module.css";
import Input from "../../UI/Input";

const MealsItemForm=(props)=>{
    const [isAmountValid, setIsAmountValid]=useState(true);

    const amountInputRef=useRef();

    const handleSubmit=(event)=>{
        event.preventDefault();

        const enteredAmount=amountInputRef.current.value;
        const amountNum=+enteredAmount;

        if(enteredAmount.trim().length===0 || amountNum<1 || amountNum>5){
            setIsAmountValid(false);
            return;
        }

        setIsAmountValid(true);

        props.onAddToCart(amountNum);

    };

    return(
        <form className={classes.form}>
            <Input ref={amountInputRef} label="Amount" inputObj={{type:"number", id:props.id, min:"1", max:"5", defaultValue:"1",step:"1"}} />
            <button type="submit" onClick={handleSubmit} className={classes.btn}>+ Add</button>
            {!isAmountValid && <span className={classes.error}>Enter valid amount(1-5)</span>}
        </form>
    );
};
export default MealsItemForm;