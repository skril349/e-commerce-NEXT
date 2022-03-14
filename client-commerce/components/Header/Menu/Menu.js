import React from "react";
import {
  Container,
  Menu as SemanticMenu,
  Grid,
  Icon,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
export default function Menu() {
  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOptions />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function MenuPlatform() {
  return (
    <SemanticMenu>
      <Link href="/play-station">
        <SemanticMenu.Item as="a">PlayStation</SemanticMenu.Item>
      </Link>
      <Link href="/xbox">
        <SemanticMenu.Item as="a">X-Box</SemanticMenu.Item>
      </Link>
      <Link href="/switch">
        <SemanticMenu.Item as="a">Switch</SemanticMenu.Item>
      </Link>
    </SemanticMenu>
  );
}

function MenuOptions() {
  return (
    <SemanticMenu>
      <SemanticMenu.Item>
        <Icon name="user outline"></Icon>
        Mi Cuenta
      </SemanticMenu.Item>
    </SemanticMenu>
  );
}
