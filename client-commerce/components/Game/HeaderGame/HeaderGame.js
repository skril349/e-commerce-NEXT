import React, { useState, useEffect } from "react";
import { Grid, Button, Image, Icon } from "semantic-ui-react";
import { size } from "lodash";
import { BASE_PATH } from "../../../utils/constants";
export default function HeaderGame(props) {
  const { game } = props;
  if (!game) return null;
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
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

function Info(props) {
  const { game } = props;

  return (
    <>
      <div className="header-game__title">
        {game[0].title}
        <Icon name="heart outline" link />
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
                  {game[0].price -
                    Math.floor(game[0].price * game[0].discount) / 100}
                  €
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <Button className="btn">Comprar</Button>
      </div>
    </>
  );
}
