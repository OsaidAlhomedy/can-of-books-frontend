import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyFavoriteBooks from "./BestBooks";
import Login from "./Login";
import Profile from "./components/Profile";
import { withAuth0 } from "@auth0/auth0-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
    };
  }

  render() {
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              <MyFavoriteBooks booksData={this.state.booksData} />
              <Login />
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Route exact path="/profile">
              <Profile />
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Route>
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
