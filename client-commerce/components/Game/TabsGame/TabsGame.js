import React from "react";
import { Button, Tab } from "semantic-ui-react";
import InfoGame from "../InfoGame";

export default function TabsGame(props) {
  const { game } = props;
  const panes = [
    {
      menuItem: "Información",
      render: () => (
        <Tab.Pane>
          <InfoGame game={game} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="tabs-game" panes={panes} />;
}
