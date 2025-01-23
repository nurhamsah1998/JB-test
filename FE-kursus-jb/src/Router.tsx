import { useRoutes } from "react-router-dom";
import App from "./App";
import MyCourse from "./views/my-course/MyCourse";
import Dashboard from "./views/Dashboard";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";
import { CreateCourse } from "./views/create-course/CreateCourse";
import CourseDetail from "./views/my-course/CourseDetail";

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/my-course",
          element: <MyCourse />,
        },
        {
          path: "/my-course/detail/:id",
          element: <CourseDetail />,
        },
        {
          path: "/my-course/create",
          element: <CreateCourse />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/register",
      element: <RegisterForm />,
    },
  ]);
}

export default Router;
