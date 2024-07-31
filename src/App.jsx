import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityDetails from "./components/CityDetails";
import { CityContextProvider } from "./contexts/CityContextProvider";
import { FakeAuthProvider } from "./contexts/FakeAuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";

// import Home from "./components/Home";
// import Product from "./components/Product";
// import Pricing from "./components/Pricing";
// import PageNotFound from "./components/PageNotFound";
// import Login from "./components/Login";
// import MainApp from "./components/MainApp";
import Cities from "./components/Cities";
import FormData from "./components/FormData";
import Countries from "./components/Countries";

// import { useEffect, useState } from "react";
// import style from "./App.modul.css";

const Home = lazy(() => import("./components/Home"));
const Product = lazy(() => import("./components/Product"));
const Pricing = lazy(() => import("./components/Pricing"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
const Login = lazy(() => import("./components/Login"));
const MainApp = lazy(() => import("./components/MainApp"));

export default function App() {
  return (
    <FakeAuthProvider>
      <CityContextProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="product" element={<Product />} />

              <Route path="pricing" element={<Pricing />} />

              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <MainApp />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to={"cities"} />} />

                <Route path="cities" element={<Cities />} />
                <Route path={`cities/:cityId`} element={<CityDetails />} />

                <Route path="countries" element={<Countries />} />

                <Route path="form" element={<FormData />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityContextProvider>
    </FakeAuthProvider>
  );
}
