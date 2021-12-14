import { Route, Switch } from "react-router-dom";
import HistoryBalance from "./component/HistoryBalance";
import Home from "./component/Home";
import NavBar from "./component/NavBar";
import ViewCard from "./component/ViewCard";
import NotFoundPage from "./component/NotFoundPage";
import AboutUs from "./component/AboutUs";
import Login from "./component/Login";
import Signup from "./component/Signup";
import TransferMoney from "./component/TransferMoney";
import UpdateData from "./component/UpdateData";
import Contact from "./component/Contact";
import Payment from "./component/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToken } from "./reducers/token";
import OneHistoryPayment from "./component/OneHistoryPayment";
import OneHistoryTransaction from "./component/OneHistoryTransaction";

function App() {
  let token = useSelector((state) => state.token.token);
  const dispatch = useDispatch()

  useEffect(() => {
    if(!token && localStorage.getItem("token") !== ""){
      dispatch(setToken(JSON.parse(localStorage.getItem("token"))))
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
        <Route path="/full-data-payment/:id" exact component={OneHistoryPayment} />
        <Route path="/full-data-transaction/:id" exact component={OneHistoryTransaction} />
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
