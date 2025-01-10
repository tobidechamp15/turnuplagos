import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
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
import Dashboard from "./components/admin/Dashboard";
import Overview from "./components/admin/Overview";
import ManageEvent from "./components/admin/ManageEvent";
import ManageBanner from "./components/admin/ManageBanner";
import Notifications from "./components/admin/Notifications";
import Profile from "./components/admin/Profile";
import PromoteSelection from "./components/PromoteSelection";
import PromoteBanner from "./components/PromoteBanner";
import ViewEvent from "./components/admin/ViewEvent.jsx";

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
      { path: "/promote-selection", element: <PromoteSelection /> },
      { path: "/promote-banner", element: <PromoteBanner /> },
      { path: "/promote-event", element: <PromoteEvent /> },
      { path: "/ticket-info", element: <TicketInfo /> },
      { path: "/event-market", element: <EventMarket /> },
      { path: "/event-review", element: <EventReview /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/overview", element: <Overview /> },
      {
        path: "/dashboard/manage-event",
        element: <ManageEvent />,
      },
      { path: "/dashboard/manage-event/:id", element: <ViewEvent /> }, // Nested route for ViewEvent

      { path: "/dashboard/manage-banners", element: <ManageBanner /> },
      { path: "/dashboard/notification", element: <Notifications /> },
      { path: "/dashboard/profile", element: <Profile /> },
    ],
  },
  { path: "/event-details/:id", element: <EventDetails /> },
  { path: "/ticket-sale/:id", element: <EventDetails /> },
  { path: "/pay-stack", element: <PaystackPayment /> },
  { path: ":id", element: <ViewEvent /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
