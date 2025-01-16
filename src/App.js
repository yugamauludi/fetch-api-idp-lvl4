import './App.css';
// import LoginPage from './pages/Login';
import {RouterProvider} from "react-router-dom";
import router from "./router";


function App() {
  return (
    // <LoginPage/>
    <RouterProvider router={router} />
  );
}

export default App;
