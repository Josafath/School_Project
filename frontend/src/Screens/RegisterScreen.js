import React, {useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterScreen({location, history}) {
    
    const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    location = useLocation()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split("=")[1]: '/'
    let navigate = useNavigate();
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) =>{ 
        e.preventDefault()
        if(password != confirmpassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password))
        }
    }

    return (
        <FormContainer>
             <h1>Registrate</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Ingresar Nombre'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Ingresar email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Constraseña</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder="Ingresar contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Confirmar contraseña"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Registrarse
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Tienes una cuenta? <Link 
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Ingresa
                    </Link>
                </Col>

            </Row>
        </FormContainer>
    )
}

export default RegisterScreen