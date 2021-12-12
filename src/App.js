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

function App() {
  return (
    <div>
      <NavBar/>
      <Switch>
      <Route path="/" exact /> 
      {/* component={login} */}
        <Route path="/home" exact component={Home}/>
        <Route path="/card" exact component={ViewCard}/>
        <Route path="/history-balance" exact component={HistoryBalance}/>
        <Route path="/about-us" exact component={AboutUs}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/signup" exact component={Signup}/>
        <Route path="/transfer-money" exact component={TransferMoney}/>
        <Route path="/update-data" exact component={UpdateData}/>
        <Route path="/customer-service" exact component={Contact}/>
        <Route path="/payment" exact component={Payment}/>
        <Route path="*" exact component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App; 