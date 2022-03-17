import React, { useState, useEffect } from "react";
import {
  Container,
  Menu as SemanticMenu,
  Grid,
  Icon,
  Label,
  Button,
} from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function Menu() {
  const { logout, auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  const [user, setUser] = useState(undefined);
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
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
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
  const { onShowModal, logout, user } = props;
  return (
    <SemanticMenu>
      {user ? (
        <>
          <Link href="/orders">
            <SemanticMenu.Item as="a">
              <Icon name="game" /> Mis pedidos
            </SemanticMenu.Item>
          </Link>

          <Link href="/wish-list">
            <SemanticMenu.Item as="a">
              <Icon name="heart outline" /> Mis favoritos
            </SemanticMenu.Item>
          </Link>

          <Link href="/account">
            <SemanticMenu.Item as="a">
              <Icon name="user outline" /> {user.name} {user.lastname}
            </SemanticMenu.Item>
          </Link>

          <Link href="/cart">
            <SemanticMenu.Item as="a" className="m-0">
              <Icon name="cart" />
            </SemanticMenu.Item>
          </Link>

          <SemanticMenu.Item onClick={logout} className="m-0">
            <Icon name="power off" />
          </SemanticMenu.Item>
        </>
      ) : (
        <SemanticMenu.Item onClick={onShowModal}>
          <Icon name="user outline"></Icon>
          Mi Cuenta
        </SemanticMenu.Item>
      )}
    </SemanticMenu>
  );
}
