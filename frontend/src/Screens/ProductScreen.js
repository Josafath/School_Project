import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector} from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";


function ProductScreen({match, history}) {
    
    const [cantidad, setCantidad] = useState(1);


    let navigate = useNavigate();
    const dispatch = useDispatch()
    const product_id = useParams()
    const productDetails  = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    useEffect(() => {

        dispatch(listProductDetails(product_id.id))    

    },[dispatch, product_id])

    const addToCartHandler = () => {
        navigate(`/cart/${product_id.id}?qty=${cantidad}`)
    }

    return (
        <div>
            <Link to="/" className="btn btn-light my-3"> Volver</Link>
            {loading  ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            : (
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} 
                            text={`${product.numReviews} reviews`}
                            color={"#f8e825"}/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Precio: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Descripción: {product.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'Disponible' : 'No Disponible'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            { product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Cantidad</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control
                                                as="select"
                                                value={cantidad}
                                                onChange={(e) => setCantidad(e.target.value)}
                                            >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                            }

                            <ListGroup.Item>
                                <Button 
                                        onClick={addToCartHandler}
                                        className='btn-block'
                                        disabled={product.countInStock == 0}
                                        type='button'>
                                            Agregar a Carrito
                                </Button>
                            </ListGroup.Item>
                </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
  );
}

export default ProductScreen;
