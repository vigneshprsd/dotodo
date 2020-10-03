import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Landing } from "./component/layout/Landing";
import Navbar from "./component/layout/Navbar";
import  Login  from "./component/auth/Login";
import Register from "./component/auth/Register";
//redux
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./component/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routing/PrivateRoute";
import Todos from "./component/todos/Todos";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />

            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
