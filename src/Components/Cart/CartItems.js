import classes from "./CartItems.module.css";
import { useContext } from "react";
import CartContext from "../../context-store/CartContext1";
import CartItem from "./CartItem";

const CartItems=(props)=>{
    const ctx=useContext(CartContext);

    const handleAddCartItem=(item1)=>{
        ctx.addItem({...item1,amount:1});
    };

    const handleRemoveCartItem=(id)=>{
        ctx.removeItem(id);
    };

    return(
        <ul className={classes.list}>
        {ctx.items.map((item) => (
            <CartItem key={item.id} item={item} onAddToCart={handleAddCartItem} onRemove={handleRemoveCartItem} />
        ))}</ul>
    );
};
export default CartItems;