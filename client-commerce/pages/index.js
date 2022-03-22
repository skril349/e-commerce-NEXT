import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesApi } from "../api/game";
import { size, map } from "lodash";
import { Loader } from "semantic-ui-react";
import ListGames from "../components/ListGames/ListGames";
import Seo from "../components/Seo";

export default function Home() {
  const [games, setGames] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await getLastGamesApi(10);
      if (size(response) > 0) {
        setGames(response);
      } else {
        setGames([]);
      }
    })();
  }, []);

  return (
    <BasicLayout className="home">
      <Seo title="Home" />
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && (
        <div>
          <ListGames games={games} />
        </div>
      )}
    </BasicLayout>
  );
}
