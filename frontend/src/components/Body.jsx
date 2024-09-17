import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Register from "./Register";
import EditProfile from "./EditProfile";
function Body() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },

        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/profile/:id/edit",
          element: <EditProfile />,
        }
      ],
    },

    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default Body;
