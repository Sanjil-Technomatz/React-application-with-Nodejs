import * as React from "react";
import Signup from "./Signup";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ServiceUser from "./ServiceUser";
import EditUser from "./EditUser";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/userDetails" component={ServiceUser} />
        <Route exact path="/editDetails" component={EditUser} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
