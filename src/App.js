import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyFavoriteBooks from "./BestBooks";
import Login from "./Login";
import Profile from "./components/Profile";
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {isAuthenticated && <MyFavoriteBooks />}
              {!isAuthenticated && <Login />}
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Route exact path="/profile">
              <Profile />
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Route>
          </Switch>
          <Footer class="position-fixed fixed-bottom" />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
