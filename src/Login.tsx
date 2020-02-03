import React from "react";
import styled from "styled-components";
import { firebase, googleAuthProvider } from "./firebase";
import { ReactComponent as GoogleIcon } from "./google.svg";
import { Header } from "./Header";
import { StyledButton } from "./StyledButton";

const loginWithGoogle = () => {
  firebase
    .auth()
    .signInWithRedirect(googleAuthProvider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      // var user = result.user;
      // ...
    })
    .catch(function(error) {
      console.log(error);
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });
};

const StyledActions = styled.div`
  text-align: center;
`;

export const Login = () => {
  return (
    <div>
      <Header>Innlogging</Header>
      <StyledActions>
        <StyledButton onClick={loginWithGoogle}>
          <GoogleIcon />
        </StyledButton>
      </StyledActions>
    </div>
  );
};
