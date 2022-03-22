import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getGameByUrlApi } from "../api/game";
import HeaderGame from "../components/Game/HeaderGame/HeaderGame";
import TabsGame from "../components/Game/TabsGame/TabsGame";
import { size } from "lodash";
export default function Game() {
  const router = useRouter();
  const { query } = useRouter();
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query]);

  if (!game || game === []) {
    console.log(game);
    return null;
  }

  return (
    <BasicLayout className="game">
      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}
