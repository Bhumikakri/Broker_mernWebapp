import './App.css'
import Main from './Component/Main';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Properties from './pages/Properties';
import Listing from './pages/Listing';
import Searching from './pages/Searching';
import Contact from './Component/Contact';

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
          path: "/createproperty",
          element: <Properties />
        },
        {
          path: "/listing",
          element: <Listing />
        },
        {
          path: "/search",
          element:<Searching />
        },
        {
          path: "/contact",
          element:<Contact />
        }
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
