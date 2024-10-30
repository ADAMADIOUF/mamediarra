import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import{createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
import Home from './components/Home';
import HomeProducts from './screen/ShopScreen';
import { Provider } from 'react-redux'
import { store } from './store'
import ProductScreen from './screen/ProductScreen';
import CartScreen from './screen/CartScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import ProfileScreen from './screen/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import ShippingScreen from './screen/ShippingScreen';
import PaymentScreen from './screen/PaymentScreen';
import PlaceOrderScreen from './screen/PlaceOrderScreen';
import OrderScreen from './screen/OrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screen/ProductListScreen';
import WhislitScreen from './screen/WhislistScreen'
import ProductEditScreen from './screen/ProductEditScreen';
import UserListScreen from './screen/UserListScreen';
import UserEditScreen from './screen/UserEditScreen';
import OrderListScreen from './screen/OrderListScreen';
import MenClothing from './pages/MenClothing';
import KidsClothing from './pages/KidsClothing';
import WomenClothing from './pages/WomenClothing';
import MenShoes from './pages/MenShoes';
import WomenShoes from './pages/WomenShoes';
import KidShoes from './pages/KidShoes';
import Bag from './pages/Bag';
import Jwelry from './pages/Jwelry';
import Hats from './pages/Hats';
import Belts from './pages/Belts';
import Tailored from './pages/Tailored';
import CustomDesign from './pages/CustomDesign';
import HandCraft from './pages/HandCraft';
import DashboardScreen from './screen/DashboardScreen';
import ShopScreen from './screen/ShopScreen';
import ForgetPasswordScreen from './screen/ForgetPasswordScreen';
import ResetPasswordScreen from './screen/ResetPasswordScreen';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />} />
      <Route path='/search/:keyword' element={<Home />} />
      <Route path='/page/:pageNumber' element={<Home />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/shop' element={<ShopScreen />} />
      <Route path='/clothing/mens' element={<MenClothing />} />
      <Route path='/clothing/kids' element={<KidsClothing />} />
      <Route path='/clothing/womens' element={<WomenClothing />} />
      <Route path='/shoes/mens' element={<MenShoes />} />
      <Route path='/shoes/womens' element={<WomenShoes />} />
      <Route path='/shoes/kids' element={<KidShoes />} />
      <Route path='/accessories/bags' element={<Bag />} />
      <Route path='/accessories/jewelry' element={<Jwelry />} />
      <Route path='/accessories/hats' element={<Hats />} />
      <Route path='/accessories/belts' element={<Belts />} />
      <Route path='/custom-african/clothing' element={<Tailored />} />
      <Route path='/custom-african/designs' element={<CustomDesign />} />
      <Route path='/custom-african/handcrafted' element={<HandCraft />} />
      <Route path='/custom-african/handcrafted' element={<HandCraft />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/forgot-password' element={<ForgetPasswordScreen />} />
      <Route path='/reset-password/:token' element={<ResetPasswordScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/wishlist' element={<WhislitScreen />} />
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
      </Route>
      <Route path='' element={<AdminRoute />}>
        <Route path='/admin/dashboard' element={<DashboardScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/orderlist' element={<OrderListScreen />} />

        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        {' '}
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
)
reportWebVitals();
