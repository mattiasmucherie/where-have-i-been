import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
