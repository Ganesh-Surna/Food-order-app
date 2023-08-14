import { useContext } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import Card from "../UI/Card";

import CartContext from "../../context-store/CartContext1";
import CartItems from "./CartItems";

const Cart=(props)=>{

    const ctx=useContext(CartContext);

    const hasItems=ctx.items.length>0;

    return(
        <Modal onHideCart={props.onHideCart}>
            <Card>
                <CartItems/>
                <div className={classes.total}>
                    <div className={classes["total-amount"]}>
                        <span className={classes.title}>Total Amount</span>
                        <span className={classes["total-price"]}>${ctx.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className={classes["btn-group1"]}>
                        <button className={classes["close-btn"]} onClick={props.onHideCart}>Close</button>
                        {hasItems && <button className={classes["order-btn"]}>Order</button>}
                    </div>
                </div>
            </Card>
        </Modal>
    );
};
export default Cart;