import { createBrowserRouter } from "react-router";
import Root from "../RootLayout/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthLayout from "../layouts/AuthLayouts";
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import AllTrainers from "../pages/Trainers/AllTrainers";
import TrainerDetails from "../pages/Trainers/TrainerDetails";
import BeATrainer from "../pages/Trainers/BeATrainer";
import PrivateRoutes from "../routes/PrivateRoutes";
import TrainerBooking from "../pages/Trainers/TrainerBooking";
import Payment from "../pages/Dashboard/Payment/Payment";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import AdminNewsletter from "../pages/Dashboard/AdminNewsletter/AdminNewsletter";
import AppliedTrainerList from "../pages/Dashboard/AppliedTrainer/AppliedTrainerList";
import AppliedTrainerDetails from "../pages/Dashboard/AppliedTrainer/AppliedTrainerDetails";
import AllTrainersD from "../pages/Dashboard/AllTrainersD/AllTrainersD";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import AllClasses from "../pages/AllClasses/AllClasses";
import TrainerAddSlot from "../pages/Dashboard/Trainer/TrainerAddSlot/TrainerAddSlot";
import AdminBalance from "../pages/Dashboard/AdminBalance/AdminBalance";
import TrainerManageSlot from "../pages/Dashboard/TrainerManageSlot/TrainerManageSlot";
import Profile from "../pages/Dashboard/Member/Profile";
import ActivityLog from "../pages/Dashboard/Member/ActivityLog";
import AddForumModal from "../pages/Dashboard/AddForumModal/AddForumModal";
import ForumPage from "../pages/Home/Forum/ForumPage";
import ForumDetails from "../pages/Home/Forum/ForumDetails";
import BookedTrainer from "../pages/Dashboard/Member/BookedTrainer";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import TrainerRoute from "../routes/TrainerRoute";
import MemberRoute from "../routes/MemberRoute";
import AdminTrainerRoute from "../routes/AdminTrainerRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashBoardHome";
import About from "../pages/Home/About/About";
import ContactUs from "../pages/quickLinks/ContactUs";
import PrivacyPolicy from "../pages/quickLinks/PrivacyPolicy";
import TermsAndConditions from "../pages/quickLinks/TermsAndConditions";
import AdminOverview from "../pages/Dashboard/OverView/AdminOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home

      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [

      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'forbidden',
        Component: Forbidden
      },
      {
        path: 'allTrainers',
        Component: AllTrainers
      }
      ,
      {
        path: 'trainers/:trainerId',
        Component: TrainerDetails
      },
      {
        path: '/be-a-trainer',
        element: (
          <PrivateRoutes>
            <BeATrainer />
          </PrivateRoutes>
        ),
      },
      {
        path: "/trainers/:trainerId/slots/:slotId",
        element: (
          < PrivateRoutes >
            <TrainerBooking />
          </PrivateRoutes >
        )
      },
      {
        path: '/allClasses',
        Component: AllClasses
      },
      {
        path: '/forums',
        Component: ForumPage
      },
      {
        path: '/forums/:id',
        Component: ForumDetails
      },
        {
        path: '/about',
        Component: About
      },
      {
        path: '/contact',
        Component: ContactUs
      },
      {
        path: '/privacy',
        Component: PrivacyPolicy
      },
      {
        path: '/terms',
        Component: TermsAndConditions
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes>
      <DashboardLayout />
    </PrivateRoutes>,
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>
      },
      {
        path: 'payment/:slotId',

        element: <PrivateRoutes><Payment /></PrivateRoutes>
      },
      {
        path: 'overview',

        element:<AdminRoute><AdminOverview></AdminOverview></AdminRoute> ,
      },
      {
        path: 'allTrainersD',

        element:<AdminRoute><AllTrainersD></AllTrainersD></AdminRoute> ,
      },
      {
        path: 'makeAdmin',
      
        element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute> 
      },
      {
        path: 'adminNewsletter',

        element:<AdminRoute><AdminNewsletter></AdminNewsletter></AdminRoute> 
      },
      {
        path: 'appliedTrainers',
        element:<AdminRoute><AppliedTrainerList></AppliedTrainerList></AdminRoute> 
      },
      {
        path: 'appliedTrainer/:id',
        element: (
           <AdminRoute>
             <AppliedTrainerDetails />
          </AdminRoute>
         
        )
      },
      {
        path: 'adminBalance',
        element:<AdminRoute><AdminBalance></AdminBalance></AdminRoute> 
      },
      {
        path: 'adminAddClass',
        element:<AdminRoute><AddClass></AddClass></AdminRoute>
      },
      {
        path: 'trainerAddSlot',
        element:<TrainerRoute><TrainerAddSlot></TrainerAddSlot></TrainerRoute> 
      },
      {
        path: 'trainerManageSlots',
        element:<TrainerRoute><TrainerManageSlot></TrainerManageSlot></TrainerRoute> 
      },
      {
        path: 'addForum',
        element:<AdminTrainerRoute><AddForumModal></AddForumModal></AdminTrainerRoute> 
      },
      {
        path: 'profile',
        element:<MemberRoute><Profile></Profile></MemberRoute> 
      },
      {
        path: 'activityLog',
        element:<MemberRoute><ActivityLog></ActivityLog></MemberRoute> 
      },
      {
        path: 'bookedTrainer',
        element:<MemberRoute><BookedTrainer></BookedTrainer></MemberRoute> 
      },
    ]
  }
]);