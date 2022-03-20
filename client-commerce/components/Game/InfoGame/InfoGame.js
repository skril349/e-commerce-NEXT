import React from "react";
import ReactPlayer from "react-player/lazy";
import CarouselScreenshots from "../CarouselScreenShots/CarouselScreenshots";
import moment from "moment";
import "moment/locale/es";
export default function InfoGame(props) {
  const { game } = props;
  return (
    <div className="info-game">
      {game[0].video && (
        <ReactPlayer
          className="info-game__video"
          url={game[0].video}
          controls={true}
        />
      )}

      <CarouselScreenshots
        title={game[0].title}
        screenshots={game[0].screenshots}
      />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game[0].summary }} />
        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento:</h4>
          <p>{moment(game[0].releaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
