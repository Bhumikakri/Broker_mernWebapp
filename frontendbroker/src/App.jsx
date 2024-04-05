import './App.css'
import Main from './Component/Main';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Listing from './pages/Listing';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/about",
          element: <About />
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/listing",
          element: <Listing />
        },
      ]
    },
    {
      path: "/signUp",
      element: <Register />
    },
    {
      path: "/signIn",
      element: <SignIn />
    }
  ])
  return (
    <div className='App'>
     < RouterProvider router={router} />
    </div>
  )
}

export default App
