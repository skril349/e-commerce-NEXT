import React, { useState, useEffect } from "react";
import { Grid, Button, Image, Icon } from "semantic-ui-react";
import { size } from "lodash";
import { BASE_PATH } from "../../../utils/constants";
import {
  addFavoriteApi,
  isFavoriteApi,
  removeFavoriteApi,
} from "../../../api/favorites";
import useAuth from "../../../hooks/useAuth";
import classNames from "classnames";
import { useRouter } from "next/router";
import { getGameByUrlApi } from "../../../api/game";
import useCart from "../../../hooks/useCart";

export default function HeaderGame(props) {
  const { game } = props;
  const { auth, logout } = useAuth();
  const router = useRouter();

  const [reloadFavorites, setReloadFavorites] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  console.log(isFavorite);

  useEffect(() => {
    (async () => {
      const response = await isFavoriteApi(auth.idUser, game[0].id, logout);
      size(response) > 0 ? setIsFavorite(true) : setIsFavorite(false);
      setReloadFavorites(false);
    })();
  }, [game, reloadFavorites]);

  if (game === []) {
    router.replace("/");

    return null;
  }
  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image
          src={`${BASE_PATH}${game[0].poster.url}`}
          alt={game.title}
          fluid
        />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info
          game={game}
          isFavorite={isFavorite}
          auth={auth}
          logout={logout}
          setReloadFavorites={setReloadFavorites}
        />
      </Grid.Column>
    </Grid>
  );
}

function Info(props) {
  const { game, isFavorite, auth, logout, setReloadFavorites } = props;
  const { addProductCart } = useCart();

  const addFavorite = async () => {
    console.log("add Favorite");
    if (auth) {
      await addFavoriteApi(auth.idUser, game[0].id, logout);
      setReloadFavorites(true);
    }
  };

  const removeFavorite = async () => {
    console.log("quitar de favoritos");
    if (auth) {
      await removeFavoriteApi(auth.idUser, game[0].id, logout);
      setReloadFavorites(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {game[0].title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({
            like: isFavorite,
          })}
          link
          onClick={isFavorite ? removeFavorite : addFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48 horas</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: game[0].summary }}
      ></div>
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico: {game[0].price} €</p>
          <div className="header-game__buy-actions">
            {game[0].discount ? (
              <>
                <p>-{game[0].discount} %</p>
                <p>
                  {(
                    game[0].price -
                    Math.floor(game[0].price * game[0].discount) / 100
                  ).toFixed(2)}
                  €
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <Button className="btn" onClick={() => addProductCart(game[0].url)}>
          Comprar
        </Button>
      </div>
    </>
  );
}
