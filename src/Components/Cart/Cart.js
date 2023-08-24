import { Fragment, useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import Card from "../UI/Card";

import CartContext from "../../context-store/CartContext1";
import CartItems from "./CartItems";
import CheckoutForm from "./CheckoutForm";

const Cart=(props)=>{
    const ctx=useContext(CartContext);

    const [isSubmitting,setIsSubmitting]=useState(false);

    const [didSubmit,setDidsubmit]=useState(false);

    const [err,setErr]=useState(null);

    const [isOrdered,setIsOrdered]=useState(false);

    const hasItems=ctx.items.length>0;

    const handleOrder=()=>{
        setIsOrdered(true);
    };

    const handleConfirmOrder=(userData)=>{

        const sendRequest=async ()=>{
            setIsSubmitting(true);
            const response= await fetch("https://food-app-a6f82-default-rtdb.firebaseio.com/orders.json",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    user:userData,
                    cartData:ctx.items,
                })
            });

            if(!response.ok){
                console.log("response not ok");
                throw new Error("Something went wrong!");
            }

            const responseData=await response.json();

            console.log("response ok");
            console.log(responseData);

            setIsSubmitting(false);

            setDidsubmit(true);

            ctx.clearCart();
        };

        sendRequest()
        .catch((error)=>{
            console.log("catch");
            setIsSubmitting(false);
            setErr(error.message);
        });
    };

    let content=(
        <Fragment>
            <CartItems/>
            <div className={classes.total}>
                <div className={classes["total-amount"]}>
                    <span className={classes.title}>Total Amount</span>
                    <span className={classes["total-price"]}>${ctx.totalAmount.toFixed(2)}</span>
                </div>
                {isOrdered && <CheckoutForm onConfirm={handleConfirmOrder} onCancel={props.onHideCart} />}
                {!isOrdered && <div className={classes["btn-group1"]}>
                    <button className={classes["close-btn"]} onClick={props.onHideCart}>Close</button>
                    {hasItems && <button onClick={handleOrder} className={classes["order-btn"]}>Order</button>}
                </div>}
            </div>
        </Fragment>
    );

    if(isSubmitting){
        content=<p>Submitting...</p>;
    }
    if(didSubmit){
        content=(
            <Fragment>
                <p>Submitted Successfully!</p>
                <div className={classes["go-back-actions"]}>
                    <button className={classes["close-btn"]} onClick={props.onHideCart}>Close</button>
                </div>
            </Fragment>
        );
    }
    if(err){
        content=(
            <Fragment>
                <p>{err}</p>
                <div className={classes["go-back-actions"]}>
                    <button className={classes["close-btn"]} onClick={props.onHideCart}>Close</button>
                </div>
            </Fragment>
        );
    }

    return(
        <Modal onHideCart={props.onHideCart}>
            <Card>
                {content}
            </Card>
        </Modal>
    );
};
export default Cart;