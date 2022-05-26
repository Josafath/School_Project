import React, { useEffect } from 'react'
import {Link, useLocation, useParams, useSearchParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {Message} from '../components/Message'
import {addToCart} from '../actions/cartActions'
function CartScreen({match, location, history}) {
  const {id} = useParams()
  const productId =  id
  location = useLocation()
  const qty =location.state ? Number(location.state) : 1

  const dispatch = useDispatch()
  
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId,qty))
    }
  },[dispatch, productId, qty])

  return (
    <div>
        
    </div>
  )
}

export default CartScreen