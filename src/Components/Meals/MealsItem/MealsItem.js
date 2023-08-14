import { useContext } from "react";

import classes from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
import CartContext from "../../../context-store/CartContext1";

const MealsItem=(props)=>{
    const price1=`$${props.price.toFixed(2)}`;

    const cartCtx=useContext(CartContext);

    const handleAddToCart=(amountNum)=>{
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            price:+props.price,
            amount:amountNum
        });
    };

    return(
        <li className={classes.meal}>
            <div>
                <div className={classes.name}>{props.name}</div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price1}</div>
            </div>
            <div>
                <MealsItemForm onAddToCart={handleAddToCart} id={props.id}/>
            </div>
        </li>
    );
};
export default MealsItem;