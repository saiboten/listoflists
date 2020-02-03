import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { firebase } from "./firebase";

import { ListItems } from "./ListItems";
import { Login } from "./Login";

const Global = createGlobalStyle`

*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
  font-size: 62.5%; // 1 rem == 10px
}

body {
  box-sizing: border-box;
  font-size: 2rem;
}`;

const StyledApp = styled.div`
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const App: React.FC = () => {
  return (
    <StyledApp>
      <Global />
      <Router>
        <AppRouter />
      </Router>
    </StyledApp>
  );
};

const AppRouter: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loginStatusClarified, setLoginStatusClarified] = useState(false);

  useEffect(() => {
    let unsubAuthChange = firebase.auth().onAuthStateChanged(user => {
      setLoginStatusClarified(true);
      setUser(user);
    });

    return () => {
      unsubAuthChange();
    };
  }, [user]);

  if (!loginStatusClarified) {
    return <div>Loading</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Switch>
      <Route path="/:id">
        <ListItems user={user} />
      </Route>
      <Route path="/">
        <ListItems user={user} />
      </Route>
    </Switch>
  );
};

export default App;
