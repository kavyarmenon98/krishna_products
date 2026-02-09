import './App.css'
import Home from './home/Home'
import Nav from './common/Nav'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './common/ProtectedRoute';
import Login from './common/Login';
import AddProduct from './product/AddProduct';
import Register from './common/Register';
import ProductList from './product/ProductList';
import ViewProduct from './product/ViewProduct';
import EditProduct from './product/EditProduct';
import Category from './category/Category';
import Cart from './category/Cart';
import OrdersList from './admin/OrdersList';
import AdminReviews from './admin/AdminReviews';
import MyOrders from './common/MyOrder';
import OfferProductPage from './home/OfferProductPage';
import AboutMe from './home/AboutMe';
import MobileFooter from './common/MobileFooter';
import InitialSplashScreen from './common/InitialSplashScreen';

function App() {

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f1219',
            color: '#fff',
            border: '1px solid rgba(0, 161, 209, 0.2)',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#00a1d1',
              secondary: '#000',
            },
          },

          error: {
            iconTheme: {
              primary: '#ff5c5c',
              secondary: '#fff',
            },
          },
        }}
        containerStyle={{
          zIndex: 100000,
        }}
      />
      <div className="bg-black text-white min-h-screen">
        <InitialSplashScreen>
          <Router>
            <Nav />
            <MobileFooter />
            <main className="pt-20 pb-28 md:pb-0">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />

                <Route path="/addProduct" element={
                  <ProtectedRoute role="admin">
                    <AddProduct />
                  </ProtectedRoute>

                } />


                {/* Only Admins */}
                <Route
                  path="/home"
                  element={
                    <Home />
                  }
                />

                <Route path="/listProduct"
                  element={
                    // <ProtectedRoute >
                    <ProductList />
                    // </ProtectedRoute>
                  }
                />

                <Route path="/viewProduct/:id" element={<ViewProduct />} />
                <Route path="/editProduct/:id" element={<ProtectedRoute role="admin"><EditProduct /></ProtectedRoute>} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

                <Route path="/order" element={
                  <ProtectedRoute role="admin"><OrdersList />   </ProtectedRoute>} />

                <Route path="/admin/reviews" element={
                  <ProtectedRoute role="admin"><AdminReviews />   </ProtectedRoute>} />


                <Route path="/myorder" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                <Route path="/offer" element={<OfferProductPage />} />
                <Route path="/about" element={<AboutMe />} />

                <Route path="/not-authorized" element={<h1>🚫 Not Authorized</h1>} />
              </Routes>
            </main>
          </Router>
        </InitialSplashScreen>
      </div>

    </>
  )
}

export default App
