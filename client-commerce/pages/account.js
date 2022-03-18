import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { getMeApi } from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import { Icon } from "semantic-ui-react";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress/ListAddress";

export default function Account() {
  const router = useRouter();
  const { auth, logout, setReloadUser } = useAuth();
  const [user, setUser] = useState(undefined);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
    })();
  }, [auth]);

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }
  return (
    <BasicLayout className="account">
      <Configuracion
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses
        reloadAddresses={reloadAddresses}
        setReloadAddresses={setReloadAddresses}
      />
    </BasicLayout>
  );
}

function Configuracion(props) {
  const { user, logout, setReloadUser } = props;
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
      </div>
    </div>
  );
}

function Addresses(props) {
  const { reloadAddresses, setReloadAddresses } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };
  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones
        <Icon name="plus" link onClick={() => openModal("Nueva dirección")} />
      </div>

      <div className="data">
        <ListAddress
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
