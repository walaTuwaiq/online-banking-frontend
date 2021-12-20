import { Route, Switch } from "react-router-dom";
import HistoryBalance from "./components/HistoryBalance";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import ViewCard from "./components/ViewCard";
import NotFoundPage from "./components/NotFoundPage";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TransferMoney from "./components/TransferMoney";
import UpdateData from "./components/UpdateData";
import Contact from "./components/Contact";
import Payment from "./components/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./reducers/token";
import OneHistoryPayment from "./components/OneHistoryPayment";
import OneHistoryTransaction from "./components/OneHistoryTransaction";
import DepositMoney from "./components/DepositMoney";
import Footer from "./components/Footer";
import AddMoney from "./components/AddMoney";
import Settings from "./components/Settings";

function App() {
  let token = useSelector((state) => state.token.token);
  const dispatch = useDispatch()

  useEffect(() => {
    if(!token && localStorage.getItem("token") !== ""){
      dispatch(setToken(JSON.parse(localStorage.getItem("token")),JSON.parse(localStorage.getItem("admin"))))
    }
  }, [token]);

  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact />
        {/* component={login} */}
        <Route path="/home" exact component={Home} />
        <Route path="/card" exact component={ViewCard} />
        <Route path="/history-balance" exact component={HistoryBalance} />
        <Route path="/about-us" exact component={AboutUs} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/transfer-money" exact component={TransferMoney} />
        <Route path="/update-data" exact component={UpdateData} />
        <Route path="/customer-service" exact component={Contact} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/deposit-money" exact component={DepositMoney} />
        <Route path="/add-money" exact component={AddMoney} />
        <Route path="/admin-settings" exact component={Settings} />
        {/* <Route path="/update-data" exact component={UpdateData} /> */}
        <Route path="/full-data-payment/:id" exact component={OneHistoryPayment} />
        <Route path="/full-data-transaction/:id" exact component={OneHistoryTransaction} />
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
