import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { Container, Row , Image, Col} from "react-bootstrap";


class Profile extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <>
        {isAuthenticated && (
          <Container >

            <Row className='text-center mb-4'>
              <Col>
            <h2>Hello {user.name}</h2>
            </Col>
            </Row>

            <Row className='text-center mb-4'>
            <Col>
            <h2>User Email : {user.email}</h2>
            </Col>
            </Row>
            
            <Row className='text-center mb-4' >
            <Col>
            <Image src={user.picture} alt={user.name} roundedCircle style={{width:'10rem'}} />
            </Col>
            </Row>
            
          </Container>
        )}
      </>
    );
  }
}

export default withAuth0(Profile);
