import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./features/HomePage/HomePage";
import SearchPage from "./features/SearchPage/SearchPage";
import DetailPage from "./features/DetailPage/DetailPage";
import WishListPage from "./features/WishListPage/WishListPage";
import NotFound from "./features/NotFound/NotFound";
import "./index.css";
import {
    SearchDate,
    SearchKeyword,
    SearchLocation,
} from "./features/SearchPage/components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />, // Global error handling
        children: [
            { index: true, element: <HomePage /> },
            { path: "search/step1", element: <SearchDate /> },
            { path: "search/step2", element: <SearchLocation /> },
            { path: "search/step3", element: <SearchKeyword /> },
            { path: "search", element: <SearchPage /> },
            { path: "detail/:id", element: <DetailPage /> },
            { path: "wish", element: <WishListPage /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
