import React from "react";
import { Button, Container } from "semantic-ui-react";
import Header from "../../components/Header";
export default function BasicLayout(props) {
  const { children } = props;
  return (
    <Container fluid className="basic-layout">
      <Header />
      <Container className="basic-layout-content">{children}</Container>
    </Container>
  );
}
