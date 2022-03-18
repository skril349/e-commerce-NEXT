import React, { useState, useEffect } from "react";
import {
  getAddressesApi,
  deleteAddressesApi,
  updateAddressApi,
} from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import { map, size } from "lodash";
import { Button, Grid } from "semantic-ui-react";

export default function ListAddress(props) {
  const { reloadAddresses, setReloadAddresses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, [reloadAddresses, setReloadAddresses]);

  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna dirección creada</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddresses={setReloadAddresses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

function Address(props) {
  const { address, logout, setReloadAddresses, openModal } = props;
  const [loading, setLoading] = useState(false);
  const deleteAddress = async () => {
    setLoading(true);
    await deleteAddressesApi(address._id, logout);
    setLoading(false);
    setReloadAddresses(true);
  };
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state},{address.city}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button danger onClick={deleteAddress} loading={loading}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
