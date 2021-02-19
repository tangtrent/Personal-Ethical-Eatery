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
    <Card className="mt-2 p-2 overflow-auto" style={{ width: "400px" }}>
      <h1>Total: ${total}</h1>
      <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}/>
      <StripeCheckout stripeKey="pk_test_51ILuS0Fp1MZdStAzmZuANmYRFR8ahWoReeciJKWQnCdBppxfNJ0SJSH5TYF0Aa0rksYtzRjt8SpX98EepSPl4B5w00H8CqOYdu" tokey={handleToken} />
    </Card>
  )
}
