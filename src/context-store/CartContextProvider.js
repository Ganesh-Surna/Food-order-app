import CartContext from "./CartContext1";
import React,{useReducer} from "react";

const cartObject={
    items:[],
    totalAmount:0
};

const cartReducer=(state,action)=>{
    if(action.type==="ADD"){
        const updatedTotalAmount=state.totalAmount+action.item.amount*action.item.price;

        const existingItemIndex=state.items.findIndex((eachItem)=>{
            return eachItem.id===action.item.id;
        });

        const existingItem=state.items[existingItemIndex];

        let updatedItems;

        if(existingItem){
            const updatedQuantity=existingItem.amount + action.item.amount;
            const updatedItem={...existingItem, amount:updatedQuantity};
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }
        else{
            updatedItems=state.items.concat(action.item);
        }

        return {items:updatedItems, totalAmount:updatedTotalAmount};
    }
    if(action.type==="REMOVE"){

        const existingItemIndex=state.items.findIndex((eachItem)=>{
            return eachItem.id===action.id;
        });

        const existingItem=state.items[existingItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;

        if(existingItem.amount===1){
            updatedItems=state.items.filter((eachItem)=>{
                return eachItem.id !== action.id;
            });
        }
        else{
            const updatedQuantity=existingItem.amount-1;
            const updatedItem={...existingItem, amount:updatedQuantity}
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }
        return {items:updatedItems, totalAmount:updatedTotalAmount};
    }

    if(action.type==="CLEAR"){
        return cartObject;
    }

    return cartObject;
};

const CartContextProvider=(props)=>{

    const [cartState,dispatchCart]=useReducer(cartReducer,cartObject);

    const handleAddItemToCart=(item)=>{
        console.log(item);
        dispatchCart({type:"ADD", item:item});
    };

    const handleRemoveItemFromCart=(id)=>{
        dispatchCart({type:"REMOVE", id:id});
    };

    const handleClearCart=()=>{
        dispatchCart({type:"CLEAR"});
    };

    const contextObj={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:handleAddItemToCart,
        removeItem:handleRemoveItemFromCart,
        clearCart:handleClearCart,
    };

    return(
        <CartContext.Provider value={contextObj}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartContextProvider;