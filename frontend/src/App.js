import { Container } from 'react-bootstrap';
import { Routes, Route, BrowserRouter } from "react-router-dom"; 

import Footer  from './components/Footer';
import Header from './components/Header';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />}  />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile/" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen/>}/>
            <Route path="/product/:id" element={<ProductScreen/>}  />
            <Route path="cart" element={<CartScreen />} >
              <Route path=":id" element={<CartScreen />} />
            </Route>
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />

            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />

            <Route path="/admin/orderlist" element={<OrderListScreen />} />
          </Routes>
          
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
