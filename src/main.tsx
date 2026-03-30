import { RequireAuth } from "@/app/providers/RequireAuth";
import { store } from "@/app/store";
import { initAuth } from "@/features/auth/authSlice";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { Login } from "@/pages/Login";
import { Products } from "@/pages/Products";
import { createBrowserRouter } from "react-router-dom";

import "./index.css";

store.dispatch(initAuth());

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RequireAuth>
				<Products />
			</RequireAuth>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
