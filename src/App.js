import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import styles from "./App.module.css";
import Protected from "./components/Protected/Protected";
import Error from "./pages/Error/Error";
import Login from "./pages/Login/Login";
import { useSelector } from "react-redux";
import Signup from "./pages/Signup/Signup";

import Blog from "./pages/Blog/Blog";

import BlogDetails from "./pages/BlogDetails/BlogDetails";

import useAutoLogin from "./hooks/useAutoLogin";
import Loader from "./components/Loader/Loader";

function App() {
  const isAuth = useSelector((state) => state.user.auth);


  return(
    
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          {/* <Navbar /> */}
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div className={styles.main}>
                  <Login/>
                </div>
              }
            />

           
            <Route
              path="blogs"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <Blog />
                  </div>
                </Protected>
              }
            />

            <Route
              path="blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <BlogDetails />
                  </div>
                </Protected>
              }
            />

            <Route
              path="signup"
              exact
              element={
                <div className={styles.main}>
                  <Signup />
                </div>
              }
            />

          
            <Route
              path="*"
              element={
                <div className={styles.main}>
                  <Error />
                </div>
              }
            />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
