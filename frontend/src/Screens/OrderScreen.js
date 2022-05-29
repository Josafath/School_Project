import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from 'react-paypal-button-v2';
import Message from "../components/Message";
import Loader from "../components/Loader";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";

function OrderScreen({ match }) {
  const orderId = useParams();
  let navigate = useNavigate()
  const dispatch = useDispatch();
  const [sdkReady,setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success:successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success:successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   Calculate prices
  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }

  
  const addPayPalScript = () => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AT4Q6-kPW0mcXh8hshnJyNRsDSIAGuru0Z1ghkD435r1B-XCggJIv0ZEim_dVFKm9RcT9Es1wx-3jtHr'
    script.asyn = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  

  useEffect(() => {

    if(!userInfo){
      navigate('/login')
    }

    if (!order || successPay || order._id !== Number(orderId.id) || successDeliver) {
      dispatch({type: ORDER_PAY_RESET})
      dispatch({type: ORDER_DELIVER_RESET})

      dispatch(getOrderDetails(orderId.id));
    } else if(!order.isPaid) {
      if(!window.paypal){
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch,order, orderId, successPay, successDeliver]);


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId.id, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Pedido: {order._id}</h1>  
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Envío</h2>
              <p><strong>Email: </strong><a href={`mailto:${order.user.username}`}>{order.user.username}</a></p>
              <p>
                <strong>Dirección: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Entregado el: {order.paidAt}</Message>
              ) :(
                <Message variant='warning'>Sin entregar</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Método de Pago</h2>
              <p>
                <strong>Método: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Pagado el: {order.paidAt}</Message>
              ) :(
                <Message variant='warning'>Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Productos del Pedido</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Tú carrito está vacío</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Resúmen de Pedido</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Productos</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Envío</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Impuesto</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {
                !order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader/>}
                    
                    {!sdkReady ? (
                      <Loader/>
                    ): (
                      <PayPalButton 
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                          />
                    )}
                  </ListGroup.Item>
                ) 
              }
            </ListGroup>
            {loadingDeliver && <Loader/>}  
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                    type='button'
                    className='btn btn-block'
                    onClick={deliverHandler}
                >
                  Marcar como Entregado

                </Button>
              </ListGroup.Item>
            )}

          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
