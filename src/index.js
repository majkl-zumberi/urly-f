import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, useParams, useHistory } from "react-router-dom";
import http from "./http/http";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Profile from "views/Profile.js";
import Index from "views/Index.js";
import ShortUrl from "views/ShortUrl";

//guards
import GuardedRouteAdmin from "./guards/GuardedRouteAdmin"
const isAuthenticated=!!sessionStorage.getItem("userSession") && !!JSON.parse(sessionStorage.getItem("isAdmin"));
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <GuardedRouteAdmin path='/admin' component={Admin} auth={isAuthenticated}/>
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Index} />
      <Route path="/:shorturl" exact component={ShortUrl} /> 
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
