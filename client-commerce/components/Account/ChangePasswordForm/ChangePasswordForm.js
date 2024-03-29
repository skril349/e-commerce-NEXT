import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../api/user";

export default function ChangePasswordForm(props) {
  const { user, logout, setReloadUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (FormData) => {
      setLoading(true);
      const response = await updatePasswordApi(
        user.id,
        FormData.password,
        logout
      );
      if (!response || response?.statusCode === 400) {
        toast.error("Error al actualizar la contraseña");
      } else {
        setReloadUser(true);
        toast.success("actualizada la contraseña");
        formik.handleReset();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-password-form">
      <h4>Cambia tu contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Tu nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />

          <Form.Input
            name="repeatPassword"
            type="password"
            placeholder="Confirma tu nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
          />
        </Form.Group>
        <Button className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .oneOf([Yup.ref("repeatPassword")], "la contraseña  no es la misma"),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], "la contraseña  no es la misma"),
  };
}
