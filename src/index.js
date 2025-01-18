import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

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
import Login from "./components/admin/Login.jsx";
import Signup from "./components/admin/Signup.jsx";
import ForgotPassword from "./components/admin/ForgotPassword.jsx";
import ResetPasswordMessage from "./components/admin/ResetMessage.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import AdminUploadBanner from "./components/admin/AdminUploadBanner.jsx";
import ManageTIcket from "./components/ManageTIcket.jsx";
import ViewReferenceCode from "./components/ViewReferenceCode.jsx";
import DiscoverLagos from "./components/admin/DiscoverLagos.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/exploreLagos", element: <ExploreLagos /> },
      { path: "/beyondLagos", element: <AllBeyondLagos /> },
      { path: "/contact", element: <Contact /> },
      { path: "/promote-selection", element: <PromoteSelection /> },
      { path: "/promote-banner", element: <PromoteBanner /> },
      { path: "/promote-event", element: <PromoteEvent /> },
      { path: "/ticket-info", element: <TicketInfo /> },
      { path: "/manage-ticket", element: <ManageTIcket /> },
      { path: "/event-market", element: <EventMarket /> },
      { path: "/event-review", element: <EventReview /> },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
    children: [
      { path: "/dashboard/overview", element: <Overview /> },
      {
        path: "/dashboard/manage-event",
        element: <ManageEvent />,
      },
      { path: "/dashboard/manage-event/:id", element: <ViewEvent /> }, // Nested route for ViewEvent
      {
        path: "/dashboard/admin-upload-banner",
        element: <AdminUploadBanner />,
      }, // Nested route for ViewEvent

      { path: "/dashboard/manage-banners", element: <ManageBanner /> },
      { path: "/dashboard/notification", element: <Notifications /> },
      { path: "/dashboard/profile", element: <Profile /> },
    ],
  },
  { path: "/event-details/:id", element: <EventDetails /> },
  { path: "/ticket-sale/:id", element: <EventDetails /> },
  { path: "/pay-stack", element: <PaystackPayment /> },
  { path: ":id", element: <ViewEvent /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-message", element: <ResetPasswordMessage /> },
  { path: "/discover-lagos", element: <DiscoverLagos /> },
  {
    path: "/view/reference-code",
    element: <ViewReferenceCode />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
