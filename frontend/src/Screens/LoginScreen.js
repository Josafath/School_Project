import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function LoginScreen({location, history}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    location = useLocation()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split("=")[1]: '/'
    let navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) =>{ 
        e.preventDefault()
        dispatch(login(email,password))
    }

    return (
        <FormContainer>
            <h1>Ingresar</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="Ingresar email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Constraseña</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Ingresar contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Ingresar
                </Button>
            </Form>
            
            <Row className='py-3'>
                <Col>
                    CLiente Nuevo? <Link 
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Registrate
                    </Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default LoginScreen