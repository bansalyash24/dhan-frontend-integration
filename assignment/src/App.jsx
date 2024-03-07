import { useCookies } from "react-cookie";
import Positions from "./components/Postions/Positions"
import StockTrade from "./components/StockTrade/StockTrade"
import AuthenticationPage from "./pages/Authentication/Authentication";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'

function App() {
  const [,,removeCookie] = useCookies('token');  
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={
        <ProtectedRoute>
            <h1 className="header">Stock Trading App
            <button className="btn" onClick={()=>{
              removeCookie('token')
            }}>Logout</button>
            </h1>
            <Positions/>
            <StockTrade/>
        </ProtectedRoute>
      }>
        </Route>
        <Route path="/auth" element={<AuthenticationPage/>}> </Route>
      </Routes>
    </BrowserRouter>

     <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition:Bounce
      />
    </>
  )
}

export default App
