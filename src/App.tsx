import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ListItems } from "./ListItems";

const Global = createGlobalStyle`

*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}


body {

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
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/:id">
              <ListItems />
            </Route>
            <Route path="/">
              <ListItems />
            </Route>
          </Switch>
        </div>
      </Router>
    </StyledApp>
  );
};

export default App;
