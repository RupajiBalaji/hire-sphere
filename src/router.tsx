import { createBrowserRouter } from "react-router-dom";

// Layouts
import { AppLayout } from "./layouts/AppLayout";
import { RecruiterLayout } from "./layouts/RecruiterLayout";

// Public routes
import { Splash } from "./pages/Splash";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Role } from "./pages/Role";
import { Onboarding } from "./pages/Onboarding";
import { Profile } from "./pages/Profile";
import { RecruiterLogin } from "./pages/RecruiterLogin";
import { RecruiterSignUp } from "./pages/RecruiterSignUp";

// App (candidate) routes
import { Home } from "./pages/app/Home";
import { TaskFeed } from "./pages/app/TaskFeed";
import { TaskDetail } from "./pages/app/TaskDetail";
import { Jobs } from "./pages/app/Jobs";
import { MyWork } from "./pages/app/MyWork";
import { AppNotifications } from "./pages/app/Notifications";
import { AppProfile } from "./pages/app/AppProfile";
import { AppSettings } from "./pages/app/Settings";
import { EditProfile } from "./pages/app/EditProfile";

// Recruiter routes
import { RecruiterDashboard } from "./pages/recruiter/Dashboard";
import { CreateTask } from "./pages/recruiter/CreateTask";
import { Review } from "./pages/recruiter/Review";
import { RecruiterProfile } from "./pages/recruiter/RecruiterProfile";
import { RecruiterSettings } from "./pages/recruiter/RecruiterSettings";
import { RecruiterNotifications } from "./pages/recruiter/RecruiterNotifications";
import { RecruiterEditProfile } from "./pages/recruiter/RecruiterEditProfile";

import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  { path: "/", element: <Splash /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/role", element: <Role /> },
  { path: "/onboarding", element: <Onboarding /> },
  { path: "/profile", element: <Profile /> },
  { path: "/recruiter-login", element: <RecruiterLogin /> },
  { path: "/recruiter-signup", element: <RecruiterSignUp /> },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "tasks", element: <TaskFeed /> },
      { path: "tasks/:id", element: <TaskDetail /> },
      { path: "jobs", element: <Jobs /> },
      { path: "my-work", element: <MyWork /> },
      { path: "notifications", element: <AppNotifications /> },
      { path: "profile", element: <AppProfile /> },
      { path: "settings", element: <AppSettings /> },
      { path: "edit-profile", element: <EditProfile /> },
    ],
  },
  {
    path: "/recruiter",
    element: <RecruiterLayout />,
    children: [
      { index: true, element: <RecruiterDashboard /> },
      { path: "create", element: <CreateTask /> },
      { path: "review", element: <Review /> },
      { path: "profile", element: <RecruiterProfile /> },
      { path: "settings", element: <RecruiterSettings /> },
      { path: "notifications", element: <RecruiterNotifications /> },
      { path: "edit-profile", element: <RecruiterEditProfile /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
