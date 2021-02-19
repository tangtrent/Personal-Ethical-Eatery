import React from 'react'
import { useState } from "react";
import { loadStripe, } from '@stripe/stripe-js'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import StripeCheckout from 'react-stripe-checkout'
import { Card } from 'react-bootstrap'

import Cart from './Cart'

const stripePromise = loadStripe('pk_test_51ILuS0Fp1MZdStAzmZuANmYRFR8ahWoReeciJKWQnCdBppxfNJ0SJSH5TYF0Aa0rksYtzRjt8SpX98EepSPl4B5w00H8CqOYdu')

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      "::placeholder": {
        color: '#87bbfd'
      }
    },
    invalid: {
    },
    complete: {}
  }
}

function handleToken(token, addresses) {
  console.log({ token, addresses })
}

export default function Checkout( { cart, total, handleRemoveFromCart } ) {

  function handleToken(token, addresses) {
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Total: ${total}</h1>
    <Card className="mt-auto overflow-auto" style={{ width: "400px", border: "0px" }}>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}/>
    </Card>
      <div className="mt-2">
      <StripeCheckout stripeKey="pk_test_51ILuS0Fp1MZdStAzmZuANmYRFR8ahWoReeciJKWQnCdBppxfNJ0SJSH5TYF0Aa0rksYtzRjt8SpX98EepSPl4B5w00H8CqOYdu" tokey={handleToken} />
      </div>
    </div>
  )
}
