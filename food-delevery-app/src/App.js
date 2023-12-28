import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Signup from "./pages/Signup";
import store from "./store/Store";
import { Provider } from "react-redux";
import MyOrder from "./pages/MyOrder";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/myOrder" exact element={<MyOrder />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
