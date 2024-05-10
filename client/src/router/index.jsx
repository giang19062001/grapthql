import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import Error from "../pages/error";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import { noteLoader, notesLoader } from "../utils/note";
import { folderLoader } from "../utils/folders";
import PushNoti from "../components/PushNoti";

const AuthLayout = () => {
  return <AuthProvider>
    <Outlet />
  </AuthProvider>;
};

//outlet sẽ render ra thằng children
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: folderLoader,
            children: [
              {
                element: <NoteList />,
                path: "folders/:folderId",
                loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: "note/:noteId",
                    loader: noteLoader,
                  },
                ]
              },
            ]
          },
          {
            element: <PushNoti />,
            path: "/noti",
          },
        ]
      },
    ],
  },
]);
