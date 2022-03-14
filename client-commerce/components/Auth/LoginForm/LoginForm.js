import React from "react";
import { Button } from "semantic-ui-react";

export default function LoginForm(props) {
  const { showRegisterForm } = props;
  return (
    <div>
      <h1>Login Form</h1>
      <Button onClick={showRegisterForm}> ir al registro</Button>
    </div>
  );
}
