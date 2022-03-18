import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, updateAddressApi } from "../../../api/address";
import { toast } from "react-toastify";

export default function AddressForm(props) {
  const { setShowModal, setReloadAddresses, newAddress, address } = props;

  const { auth, logout } = useAuth();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      if (newAddress) {
        createAddress(formData);
      } else {
        updateAddress(formData);
      }
    },
  });

  const updateAddress = async (formData) => {
    setLoading(true);
    setReloadAddresses(false);
    const response = await updateAddressApi(address.id, formData, logout);
    if (!response) {
      toast.warning("error al actualizar la direccion");
      setLoading(false);
    } else {
      formik.resetForm();
      toast.success("dirección actualizada correctamente");
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
    }
  };

  const createAddress = async (formData) => {
    setLoading(true);
    setReloadAddresses(false);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    const response = await createAddressApi(formDataTemp, logout);
    if (!response) {
      toast.warning("error al crear la direccion");
      setLoading(false);
    } else {
      formik.resetForm();
      toast.success("dirección creada correctamente");
      setReloadAddresses(true);
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        label="titulo de la direccion"
        placeholder="titulo de la direccion"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          label="Nombre y Apellidos"
          placeholder="Nombre y apellidos"
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name="address"
          type="text"
          label="Direccion"
          placeholder="Direccion"
          onChange={formik.handleChange}
          value={formik.values.address}
          error={formik.errors.address}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          label="Ciudad"
          placeholder="Ciudad"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={formik.errors.city}
        />
        <Form.Input
          name="state"
          type="text"
          label="Estado/Provincia/Región"
          placeholder="Estado/Provincia/Región"
          onChange={formik.handleChange}
          value={formik.values.state}
          error={formik.errors.state}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="postalCode"
          type="text"
          label="Codigo postal"
          placeholder="Codigo postal"
          onChange={formik.handleChange}
          value={formik.values.postalCode}
          error={formik.errors.postalCode}
        />
        <Form.Input
          name="phone"
          type="text"
          label="Número de teléfono"
          placeholder="Número de teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Group>
      <div className="action">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear Direccion" : "Actualizar Direccion"}
        </Button>
      </div>
    </Form>
  );
}

function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
  };
}
function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}
