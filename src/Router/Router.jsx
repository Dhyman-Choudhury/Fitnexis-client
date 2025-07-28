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
      }
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
        element: <div>Dashboard Home</div>
      },
      {
        path: 'payment/:slotId',

        element: <PrivateRoutes><Payment /></PrivateRoutes>
      },
      {
        path: 'allTrainersD',
        element: <AllTrainersD></AllTrainersD>,
      },
      {
        path: 'makeAdmin',
        element: <MakeAdmin></MakeAdmin>
      },
      {
        path: 'adminNewsletter',
        element: <AdminNewsletter></AdminNewsletter>
      },
      {
        path: 'appliedTrainers',
        element: <AppliedTrainerList></AppliedTrainerList>
      },
      {
        path: 'appliedTrainer/:id',
        element: (
          // <AdminRoute>
          // </AdminRoute>
          <AppliedTrainerDetails />
        )
      },
      {
        path: 'adminBalance',
        element: <AdminBalance></AdminBalance>
      },
      {
        path: 'adminAddClass',
        element: <AddClass></AddClass>
      },
      {
        path: 'trainerAddSlot',
        element: <TrainerAddSlot></TrainerAddSlot>
      },
      {
        path: 'trainerManageSlots',
        element: <TrainerManageSlot></TrainerManageSlot>
      },
      {
        path: 'addForum',
        element: <AddForumModal></AddForumModal>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'activityLog',
        element: <ActivityLog></ActivityLog>
      },
      {
        path: 'bookedTrainer',
        element: <BookedTrainer></BookedTrainer>
      },
    ]
  }
]);