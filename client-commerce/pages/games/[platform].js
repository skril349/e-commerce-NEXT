import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getGamesPlatformApi } from "../../api/game";
import ListGames from "../../components/ListGames/ListGames";
import { size, map } from "lodash";
import { Loader } from "semantic-ui-react";

const limitPerPage = 10;
export default function Platform() {
  const { query } = useRouter();

  const [games, setGames] = useState(null);
  useEffect(() => {
    (async () => {
      console.log(query.platform);
      const response = await getGamesPlatformApi(
        query.platform,
        limitPerPage,
        0
      );
      setGames(response);
    })();
  }, [query]);

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Cargando Juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3> No hay Juegos</h3>
        </div>
      )}
      {games && size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
