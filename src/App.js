import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyFavoriteBooks from "./BestBooks";
import Login from "./Login";
import Profile from "./components/Profile";
import BookFormModal from "./components/BookFormModal";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  showFormModal = () => {
    this.setState({
      showModal: true,
    });
  };

  hideFormModal = () => {
    this.setState({
      showModal: false,
    });
  };

  handleSubmitting = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    const bookTitle = event.target.title.value;
    const bookDescription = event.target.description.value;
    const bookStatus = event.target.select.value;

    const bookData = {
      title: bookTitle,
      description: bookDescription,
      email: user.email,
      status: bookStatus,
    };

    axios
      .post(`${process.env.REACT_APP_URL}/books`, bookData)
      .then((result) => {
        this.setState({
          booksData: result.data,
        });
      })
      .catch((err) => {
        console.log("the error is", err);
      });
  };

  removeBook = (id) => {
    const { user } = this.props.auth0;
    axios
    .delete(`${process.env.REACT_APP_URL}/books/${id}`, {params: {email:user.email}})
    .then(result => {
      this.setState ({
        booksData: result.data,
      })
    })
    .catch (err => {
      console.log("the error is", err);
    }) 
  } 

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {isAuthenticated && (
                <MyFavoriteBooks
                  showFormModal={this.showFormModal}
                  booksData={this.state.booksData}
                  removeBook={this.removeBook}
                />
              )}
              {!isAuthenticated && <Login />}
              <BookFormModal
                show={this.state.showModal}
                hideFormModal={this.hideFormModal}
                handleSubmitting={this.handleSubmitting}
              />
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
