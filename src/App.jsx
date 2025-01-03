import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./pages/NoPage";
import DetailPage from "./pages/DetailPage";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import LandingPage from "./pages/LandingPage";
import FAQPage from "./pages/FAQPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="/DetailPage" element={<DetailPage />} />
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route
            path="/Category/:categoryName/:subCategoryName"
            element={<Category />}
          />
          <Route path="/Category/:categoryName" element={<Category />} />
          <Route path="/faq/:faqType" element={<FAQPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
