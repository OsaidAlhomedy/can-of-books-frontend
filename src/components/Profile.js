import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class Profile extends Component {
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log(user);
    return (
      <>
        {isAuthenticated && (
          <>
            <h2>Hello {user.name}</h2>
            <h2>User Email {user.email}</h2>
            <img src={user.picture} alt={user.name} />
          </>
        )}
      </>
    );
  }
}

export default withAuth0(Profile);
