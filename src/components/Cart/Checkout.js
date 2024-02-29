import { useReducer, useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isNotFiveChar = value => value.trim().length !== 5;

const initialNameState = {
    value: '',
    isValid: true
};

const nameReducer = (state,action) => {
    if(action.type === 'NAME_INPUT'){
        return {
            value: action.val,
            isValid : action.val.trim() !== ''
        }
    }
    return initialNameState;
}

const Checkout = (props) => {

    const [nameState, dispatchName] = useReducer(nameReducer,initialNameState);

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true,
    });

    //const nameInputRef = nameState.value;
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const nameChangeHandler = (event) => {
        dispatchName({type:'NAME_INPUT', val: event.target.value})
    }

    const confirmHandler = (event) => {
        event.preventDefault();
        //const enteredName = nameState.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = nameState.isValid;
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode) && !isNotFiveChar(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name:nameState.isValid,
            street:enteredStreetIsValid,
            postalCode:enteredPostalCodeIsValid,
            city:enteredCityIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

        if(!formIsValid){
            return;
        }

        //return console.log({
        //    name: enteredName,
        //    street: enteredStreet,
        //    postalCode: enteredPostalCode,
        //    city: enteredCity
        //})

        props.onConfirm({
            name: nameState.isValid,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        })
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${nameState.isValid?'':classes.invalid}`}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' value={nameState.value} onChange={nameChangeHandler}/>
            {!formInputsValidity.name && <p>Enter a valid Name!!</p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.street?'':classes.invalid}`}>
            <label htmlFor='street'>Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
            {!formInputsValidity.street && <p>Enter a valid Street name!!</p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.postalCode?'':classes.invalid}`}>
            <label htmlFor='postal'>Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}/>
            {!formInputsValidity.postalCode && <p>Enter a valid Postal Code!!</p>}
        </div>
        <div className={`${classes.control} ${formInputsValidity.city?'':classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formInputsValidity.city && <p>Enter a valid City!!</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
            Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
        </div>
        </form>
    );
};

export default Checkout;