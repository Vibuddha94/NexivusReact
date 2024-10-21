import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/category'
import Product from './pages/product'
import OrderHome from './pages/order/OrderHome'
import Orders from './pages/order/Orders'
import CreateOrder from './pages/order/CreateOrder'
import Stock from './pages/stock'
import User from './pages/user'
import Login from './pages/auth/Login'

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/product' element={<Product/>}/>
      <Route path='/order' element={<OrderHome/>}/>
      <Route path='/order/orders' element={<Orders/>}/>
      <Route path='/order/createorder' element={<CreateOrder/>}/>
      <Route path='/stock' element={<Stock/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/auth/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App