import classes from "./CheckoutForm.module.css";
import useInput from "../../hooks/use-input";

const CheckoutForm=(props)=>{

    const {
        inputValue:name,
        isValid:nameIsValid,
        hasError:nameHasError,
        handleChange:handleNameChange,
        handleBlur:handleNameBlur,
        resetValue:resetName,
    }=useInput((inputVal)=>inputVal.trim().length>0);

    const {
        inputValue:street,
        isValid:streetIsValid,
        hasError:streetHasError,
        handleChange:handleStreetChange,
        handleBlur:handleStreetBlur,
        resetValue:resetStreet,
    }=useInput((inputVal)=>inputVal.trim().length>0);

    const {
        inputValue:pin,
        isValid:pinIsValid,
        hasError:pinHasError,
        handleChange:handlePinChange,
        handleBlur:handlePinBlur,
        resetValue:resetPin,
    }=useInput((inputVal)=>inputVal.trim().length===6);

    const {
        inputValue:city,
        isValid:cityIsValid,
        hasError:cityHasError,
        handleChange:handleCityChange,
        handleBlur:handleCityBlur,
        resetValue:resetCity,
    }=useInput((inputVal)=>inputVal.trim().length>0);

    let formIsValid=false;

    if(nameIsValid && streetIsValid && pinIsValid && cityIsValid){
        formIsValid=true;
    }

    const handleConfirm=(event)=>{
        event.preventDefault();

        if(!formIsValid){
            return;
        }

        console.log("Confirmed");

        props.onConfirm({name,street,pin,city});

        resetName();
        resetStreet();
        resetPin();
        resetCity();
    };

    const nameClasses=nameHasError ? `${classes["input-grp"]} ${classes["invalid"]} ` : `${classes["input-grp"]}`;
    const streetClasses=streetHasError ? `${classes["input-grp"]} ${classes["invalid"]} ` : `${classes["input-grp"]}`;
    const pinClasses=pinHasError ? `${classes["input-grp"]} ${classes["invalid"]} ` : `${classes["input-grp"]}`;
    const cityClasses=cityHasError ? `${classes["input-grp"]} ${classes["invalid"]} ` : `${classes["input-grp"]}`;

    return(
        <form onSubmit={handleConfirm} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" value={name} onChange={handleNameChange} onBlur={handleNameBlur} />
                {nameHasError && <p className={classes.err}>Enter valid name!</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" value={street} onChange={handleStreetChange} onBlur={handleStreetBlur}/>
                {streetHasError && <p className={classes.err}>Enter valid street address!</p>}
            </div>
            <div className={pinClasses}>
                <label htmlFor="pincode">Postal Code</label>
                <input type="text" id="pincode" value={pin} onChange={handlePinChange} onBlur={handlePinBlur}/>
                {pinHasError && <p className={classes.err}>Enter valid Postal Code!(6 digits)</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" value={city} onChange={handleCityChange} onBlur={handleCityBlur}/>
                {cityHasError && <p className={classes.err}>Enter valid City!</p>}
            </div>
            <div className={classes.actions}>
                <button className={classes["cancel-btn"]} type="button" onClick={props.onCancel}>Cancel</button>
                <button className={classes["confirm-btn"]} type="submit" disabled={!formIsValid} >Confirm</button>
            </div>
        </form>
    )

};
export default CheckoutForm;