import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";
import { toast } from "react-toastify";

export default function RegisterForm(props) {
  const { showLoginForm } = props;
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registerApi(formData);
      setLoading(false);
      if (response?.jwt) {
        showLoginForm();
      } else {
        toast.error("error al registrar el usuario");
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="apellidos"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de Usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo Electrónico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showLoginForm}>
          Iniciar sesión
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          registrar
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}
function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
