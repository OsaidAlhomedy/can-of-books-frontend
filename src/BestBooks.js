import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardGroup, Button, Row } from "react-bootstrap";
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

  componentDidUpdate(prevProps) {
    if (this.props.booksData !== prevProps.booksData) {
      this.getData();
    }
  }

  render() {
    return (
      <>
        <CardGroup>
          {this.state.booksData &&
            this.state.booksData.map((item) => {
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="https://via.placeholder.com/300"
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button
                      onClick={() => this.props.removeBook(item.id)}
                      variant="danger"
                    >
                      Delete Book
                    </Button>
                    <Button
                      onClick={() =>
                        this.props.showUpdateModal(
                          item.id,
                          item.title,
                          item.description,
                          item.status
                        )
                      }
                      variant="success"
                    >
                      Update Book
                    </Button>
                    <Card.Footer>
                      <small className="text-muted">
                        {item.status ? "Available" : "Not Available"}
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              );
            })}
        </CardGroup>
        <Row className="mt-4 text-center" md={12}>
          <Button onClick={this.props.showFormModal} variant="primary">
            ADD NEW BOOK
          </Button>
        </Row>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
