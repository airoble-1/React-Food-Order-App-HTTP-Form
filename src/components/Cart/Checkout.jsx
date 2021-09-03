import classes from "./Checkout.module.css"
import { useRef, useState } from "react"

const isEmpty = (value) => value.trim() === ""
const isFiveChars = (value) => value.trim().length === 5

const Checkout = (props) => {
  const [formsInputValidity, setFormsInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalcode: true,
  })

  const nameInput = useRef()
  const streetInput = useRef()
  const postalCodeInput = useRef()
  const cityInput = useRef()

  const confirmHandler = (event) => {
    event.preventDefault()
    const enteredName = nameInput.current.value
    const enteredStreet = streetInput.current.value
    const enteredPostalCode = postalCodeInput.current.value
    const enteredCity = cityInput.current.value

    const enterNameIsValid = !isEmpty(enteredName)
    const enterStreetIsValid = !isEmpty(enteredStreet)
    const enterPostalCodeIsValid = isFiveChars(enteredPostalCode)
    const enterCityIsValid = !isEmpty(enteredCity)

    setFormsInputValidity({
      name: enterNameIsValid,
      street: enterStreetIsValid,
      postalcode: enterPostalCodeIsValid,
      city: enterCityIsValid,
    })

    const formIsValid =
      enterNameIsValid &&
      enterCityIsValid &&
      enterCityIsValid &&
      enterPostalCodeIsValid

    if (!formIsValid) {
      return
    }
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formsInputValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input ref={nameInput} type="text" id="name" />
        {formsInputValidity.name && <p>Please enter your name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street" />
        {formsInputValidity.street && <p>Please enter your street!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeInput} type="text" id="postal" />
        {formsInputValidity.postalcode && <p>Please enter your postal code!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city" />
        {formsInputValidity.city && <p>Please enter your city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
