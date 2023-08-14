import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import { useContext, useState, useEffect } from "react";

import CartContext from "../../context-store/CartContext1";

const HeaderCartButton=(props)=>{

    const ctx=useContext(CartContext);

    const {items}=ctx;

    const [isItemAdded,setIsItemAdded]=useState(false);

    useEffect(()=>{
        if(items.length===0){
            return;
        }
        const timer=setTimeout(()=>{
            setIsItemAdded(true);
        },300);

        return ()=>{
            clearTimeout(timer);
            setIsItemAdded(false);
        };
    },[items]);

    const numberOfCartItems=items.reduce((curLen, eachItem)=>{
        return curLen + eachItem.amount;
    },0);

    const btnClasses=`${classes.button} ${isItemAdded ? classes.bump : ""}`;

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};
export default HeaderCartButton;