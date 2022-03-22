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
import { getPlatformApi } from "../../../api/platform";
import { map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function Menu() {
  const { logout, auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getPlatformApi();

      setPlatforms(response);
    })();
  }, []);

  const [user, setUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesion");
  const [platforms, setPlatforms] = useState([]);
  const onShowModal = () => setShowModal(true);

  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatform platforms={platforms} />
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

function MenuPlatform(props) {
  const { platforms } = props;
  return (
    <SemanticMenu>
      {map(platforms, (platform) => (
        <Link href={`/games/${platform.url}`}>
          <SemanticMenu.Item as="a" name={platform.url}>
            {platform.title}
          </SemanticMenu.Item>
        </Link>
      ))}
    </SemanticMenu>
  );
}

function MenuOptions(props) {
  const { onShowModal, logout, user } = props;
  const { productsCart } = useCart();
  return (
    <SemanticMenu>
      {user ? (
        <>
          <Link href="/orders">
            <SemanticMenu.Item as="a">
              <Icon name="game" /> Mis pedidos
            </SemanticMenu.Item>
          </Link>

          <Link href="/wishlist">
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
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
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
