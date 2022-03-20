import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getGameByUrlApi } from "../api/game";
import HeaderGame from "../components/Game/HeaderGame/HeaderGame";
import TabsGame from "../components/Game/TabsGame/TabsGame";
export default function Game() {
  const { query } = useRouter();
  const [game, setGame] = useState(null);
  console.log("game", game);

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      setGame(response);
    })();
  }, [query]);

  if (!game) return null;
  return (
    <BasicLayout className="game">
      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}
