import { Route, Switch } from "react-router-dom";
import HistoryBalance from "./components/home/HistoryBalance";
import Home from "./components/home/Home";
import NavBar from "./components/Nav/NavBar";
import ViewCard from "./components/home/ViewCard";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import AboutUs from "./components/Nav/AboutUs";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import TransferMoney from "./components/home/TransferMoney";
import UpdateData from "./components/home/UpdateData";
import Contact from "./components/home/Contact";
import Payment from "./components/home/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./reducers/token";
import OneHistoryPayment from "./components/home/OneHistoryPayment";
import OneHistoryTransaction from "./components/home/OneHistoryTransaction";
import Footer from "./components/Nav/Footer";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AdminPage from "./components/AdminSettings/AdminPage";
import ResetPass from "./components/auth/ResetPass";
import Chat from "./components/AdminSettings/Chat";
import WelcomePage from "./components/home/WelcomePage";
import Currency from "./components/home/Currency";
require("dotenv").config();

function App() {
  let token = useSelector((state) => state.token.token);
  const isAdmin = useSelector((state) => state.token.user_admin);
  const idUser = useSelector((state) => state.token.user_id);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(async () => {
    if (!token && localStorage.getItem("token") !== "") {
      dispatch(
        setToken(
          JSON.parse(localStorage.getItem("token")),
          JSON.parse(localStorage.getItem("admin")),
          JSON.parse(localStorage.getItem("user")),
          JSON.parse(localStorage.getItem("userName"))
        )
      );
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/login`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (token) {
        dispatch(setToken("", "", ""));
        localStorage.setItem("token", "");
        localStorage.setItem("admin", "");
        localStorage.setItem("user", "");
        localStorage.setItem("userName", "");
        JSON.parse(localStorage.getItem("user", ""));
        history.push("/");
        alert("Log in again");
      }
      console.log(error.response.data, "error");
    }
  }, [token]);

  return (
    <div>
      <NavBar />
      {token ? (
        isAdmin ? (
          <div>
            <Switch>
              <Route path="/home" exact component={WelcomePage} />
              <Route path="/update-data" exact component={UpdateData} />
              <Route path="/customer-service" exact component={Contact} />
              <Route path="/admin-page" exact component={AdminPage} />
              <Route path="/customer-service/:id" exact component={Chat} />
              <Route path="/about-us" exact component={AboutUs} />
              <Route path="/currency-today" exact component={Currency} />
              <Route path="*" exact component={NotFoundPage} />
            </Switch>
          </div>
        ) : (
          <div>
            <Switch>
              <Route path="/home" exact component={Home} />
              <Route path="/" exact component={Home} />
              <Route path="/card" exact component={ViewCard} />
              <Route path="/history-balance" exact component={HistoryBalance} />
              <Route path="/transfer-money" exact component={TransferMoney} />
              <Route path="/update-data" exact component={UpdateData} />
              <Route path="/customer-service" exact component={Contact} />
              <Route path="/payment" exact component={Payment} />
              <Route path="/currency-today" exact component={Currency} />
              <Route
                path="/full-data-payment/:id"
                exact
                component={OneHistoryPayment}
              />
              <Route
                path="/full-data-transaction/:id"
                exact
                component={OneHistoryTransaction}
              />
              <Route path="/about-us" exact component={AboutUs} />
              <Route path="*" exact component={NotFoundPage} />
            </Switch>
          </div>
        )
      ) : (
        <Switch>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/about-us" exact component={AboutUs} />
          <Route path="/login" exact component={Login} />
          <Route path="/forget-pass" exact component={ResetPass} />
          <Route path="/signup" exact component={Signup} />
          <Route path="*" exact component={NotFoundPage} />
        </Switch>
      )}

      <Footer />
    </div>
  );
}

export default App;
