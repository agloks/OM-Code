import { RouterProvider } from 'react-router-dom';

import { createBrowserRouter } from 'react-router-dom';
import SignUpView from './views/signUp/SignUp.View';
import SignInView from './views/signIn/SignIn.view';
import UsersListView from './views/usersList/UserList.view';
import ProfileView from './views/profile/Profile.View';
import RegisterUserView from './views/registerUser/registerUser.View';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInView />,
  },
  {
    path: "/sign-in",
    element: <SignInView />,
  },
  {
    path: "/sign-up",
    element: <SignUpView />,
  },
  {
    path: "/users-list",
    element: <UsersListView />,
  },
  {
    path: "/profile",
    element: <ProfileView />,
  },
  {
    path: "/register-user",
    element: <RegisterUserView />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}
