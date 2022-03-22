import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { size, forEach } from "lodash";
import { getFavoriteApi } from "../api/favorites";
import useAuth from "../hooks/useAuth";
import ListGames from "../components/ListGames";
import { Loader } from "semantic-ui-react";

export default function Wishlist() {
  const { auth, logout } = useAuth();
  const [games, setGames] = useState(null);
  console.log(games);
  useEffect(() => {
    (async () => {
      const response = await getFavoriteApi(auth.idUser, logout);
      if (size(response) > 0) {
        const gamesList = [];
        forEach(response, (data) => {
          gamesList.push(data.game);
        });
        setGames(gamesList);
      } else {
        setGames([]);
      }
    })();
  }, []);
  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">LISTA DE DESEOS</div>
        <div className="data">
          {!games && <Loader active>Cargando Juegos</Loader>}
          {games && size(games) === 0 && (
            <div className="data__not-found">
              <h3> No hay Juegos</h3>
            </div>
          )}
          {games && size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
