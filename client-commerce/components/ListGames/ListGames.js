import React from "react";
import { map } from "lodash";
import { Grid, Button, Image, GridColumn } from "semantic-ui-react";
import Link from "next/link";
import { BASE_PATH } from "../../utils/constants";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpMd,
  breakpointUpSm,
  breakpointUpLg,
} from "../../utils/breakpoint";

export default function ListGames(props) {
  const { width } = useWindowSize();
  const { games } = props;

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpLg:
        return 5;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <Game game={game} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

function Game(props) {
  const { game } = props;
  return (
    <GridColumn className="list-games__game">
      <Link href={`/${game.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image src={`${BASE_PATH}${game.poster.url}`} alt={game.title} />
            <div className="list-games__game-poster-info">
              {game.discount ? (
                <span className="discount">-{game.discount}%</span>
              ) : (
                <span />
              )}
              <span className="price">{game.price}€</span>
            </div>
          </div>
          <h2>{game.title}</h2>
        </a>
      </Link>
    </GridColumn>
  );
}
