import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button ,Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({history}) {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if(!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Seleccionar Método</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='Paypal o Tarjeta de Crédito'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continuar
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen