import classes from "./CartItem.module.css";

const CartItem=(props)=>{

    const handleAdd=()=>{
        props.onAddToCart(props.item);
    };

    const handleRemove=()=>{
        props.onRemove(props.item.id);
    };

    return(
        <li className={classes.meal}>
            <div>
                <span className={classes.name}>{props.item.name}</span>
                <div className={classes["amount-container"]}>
                    <span className={classes.price}>${props.item.price.toFixed(2)}</span>
                    <span className={classes.quantity}>x{props.item.amount}</span>
                </div>
            </div>
            <div className={classes["btn-group"]}>
                <button className={classes.btn} onClick={handleRemove}>-</button>
                <button className={classes.btn} onClick={handleAdd}>+</button>
            </div>
        </li>
    );
};
export default CartItem;