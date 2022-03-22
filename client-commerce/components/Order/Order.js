import React, { useState, useEffect } from "react";
import { Image, Icon } from "semantic-ui-react";
import moment from "moment";
import "moment/locale/es";
import Link from "next/link";
import BasicModal from "../Modal/BasicModal";
import { BASE_PATH } from "../../utils/constants";
export default function Order(props) {
  const [showModal, setShowModal] = useState(false);
  const { orders } = props;
  const { game, totalPayment, createdAt, addressShipping } = orders;
  const { title, poster, url } = game;
  console.log(orders);
  return (
    <>
      <div className="order">
        <div className="order_info">
          <div className="order_info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={`${BASE_PATH}${poster.url}`} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>{totalPayment}</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-date">
              {moment(createdAt).format("L")}-{moment(createdAt).format("LT")}
            </p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        addressShipping={addressShipping}
        title={title}
      />
    </>
  );
}

function AddressModal(props) {
  const { showModal, setShowModal, addressShipping, title } = props;
  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      title={title}
      size="tiny"
    >
      <h3>El pedido se ha eniado a la siguiente direccion:</h3>
      <p>{addressShipping.name}</p>
      <p>{addressShipping.address}</p>
      <p>
        {addressShipping.state}, {addressShipping.city},
        {addressShipping.postalCode}
      </p>
      <p>{addressShipping.phone}</p>
    </BasicModal>
  );
}
