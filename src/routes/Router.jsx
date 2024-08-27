import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Main from "../pages/Main";
import ProductDetail from "../pages/ProductDetail";
import SignUp from "../pages/SignUp";
import ScrollToTop from "./ScrollTop";
import ShoppingCart from "../pages/ShoppingCart";
import Order from "../pages/Order";
import MyPage from "../pages/MyPage";
import SellerCenter from "../pages/SellerCenter";

export default function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/sellercenter" element={<SellerCenter />} />
      </Routes>
    </BrowserRouter>
  );
}
