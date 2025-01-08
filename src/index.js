import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
// import SideBar from "./components/SideBar";
import App from "./App";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import ExploreLagos from "./components/ExploreLagos";
import AllBeyondLagos from "./components/AllBeyondLagos";
import EventDetails from "./components/EventDetails";
import PromoteEvent from "./components/PromoteEvent";
import TicketInfo from "./components/TicketInfo";
import EventMarket from "./components/EventMarket";
import EventReview from "./components/EventReview";
import PaystackPayment from "./components/PaystackPayment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/exploreLagos", element: <ExploreLagos /> },
      { path: "/beyondLagos", element: <AllBeyondLagos /> },
      { path: "/contact", element: <Contact /> },
      { path: "/promote-event", element: <PromoteEvent /> },
      { path: "/ticket-info", element: <TicketInfo /> },
      { path: "/event-market", element: <EventMarket /> },
      { path: "/event-review", element: <EventReview /> },
    ],
  },
  { path: "/event-details/:id", element: <EventDetails /> },
  { path: "/ticket-sale/:id", element: <EventDetails /> },
  { path: "/pay-stack", element: <PaystackPayment /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
