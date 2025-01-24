import { useRoutes } from "react-router-dom";
import App from "./App";
import Dashboard from "./views/Dashboard";
import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";
import { CreateCourse } from "./views/create-course/CreateCourse";
import CourseDetail from "./views/my-course/CourseDetail";
import Client from "./Client";
import PublicCourse from "./views/PublicCourse";
import NotFound from "./NotFound";

function Router() {
  return useRoutes([
    {
      path: "/jb-admin",
      element: <App />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "my-course/detail/:id",
          element: <CourseDetail />,
        },
        {
          path: "my-course/create",
          element: <CreateCourse />,
        },
      ],
    },
    {
      path: "/",
      element: <Client />,
      children: [
        {
          index: true,
          element: <PublicCourse />,
        },
        {
          path: "course/detail/:id",
          element: <CourseDetail />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/register",
      element: <RegisterForm />,
    },
  ]);
}

export default Router;
