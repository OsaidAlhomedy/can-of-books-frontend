import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import { withAuth0 } from "@auth0/auth0-react";
import axios from "axios";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getData = async () => {
    const { user, isAuthenticated } = this.props.auth0;
    if (isAuthenticated) {
      const url = `${process.env.REACT_APP_URL}/books`;
      const paramObj = {
        params: {
          name: user.email,
        },
      };
      await axios
        .get(url, paramObj)
        .then((resultData) => {
          this.setState({
            booksData: resultData.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(this.state.booksData);
    }
  };

  componentDidMount = () => {
    this.getData();
  };
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Container>
        {this.state.booksData &&
          this.state.booksData.map((item) => {
            <Jumbotron>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <p>{item.status}</p>
            </Jumbotron>;
          })}
      </Container>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
