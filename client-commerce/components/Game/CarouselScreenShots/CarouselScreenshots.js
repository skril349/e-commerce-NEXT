import React, { useState } from "react";
import { BASE_PATH } from "../../../utils/constants";
import { Image, Modal } from "semantic-ui-react";
import Slider from "react-slick";
import { map } from "lodash";

const settings = {
  className: "carousel-screenshots",
  dots: false,
  Infinite: true,
  speed: 500,
  slidesToShow: 1,
  swipeToSlider: true,
};
export default function CarouselScreenshots(props) {
  const { title, screenshots } = props;
  const [showModal, setShowModal] = useState(false);
  const [urlImage, setUrlImage] = useState(null);

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };
  return (
    <>
      <Slider {...settings}>
        {map(screenshots, (screenshot) => (
          <Image
            key={screenshot.id}
            src={`${BASE_PATH}${screenshot.url}`}
            alt={screenshot.name}
            onClick={() => openImage(`${BASE_PATH}${screenshot.url}`)}
          />
        ))}
      </Slider>
      <Modal open={showModal} onClose={() => setShowModal(false)} size="large">
        <Image src={urlImage} alt={title} />
      </Modal>
    </>
  );
}
