import React, { useState } from "react";
import {
  Container,
  Menu as SemanticMenu,
  Grid,
  Icon,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";

export default function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesion");
  const onShowModal = () => setShowModal(true);

  const onCloseModal = () => setShowModal(false);
  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            <MenuOptions onShowModal={onShowModal} />
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}></Auth>
      </BasicModal>
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

function MenuOptions(props) {
  const { onShowModal } = props;
  return (
    <SemanticMenu>
      <SemanticMenu.Item onClick={onShowModal}>
        <Icon name="user outline"></Icon>
        Mi Cuenta
      </SemanticMenu.Item>
    </SemanticMenu>
  );
}
