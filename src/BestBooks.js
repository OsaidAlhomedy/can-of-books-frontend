import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
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
      axios
        .get(url, paramObj)
        .then((result) => {
          this.setState({
            booksData: result.data,
          });
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Carousel>
        {this.state.booksData &&
          this.state.booksData.map((item) => {
            return (
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/1000x300.png/363533?text=Books+Poster+Place+Holder"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
