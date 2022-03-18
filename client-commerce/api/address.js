import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/authFetch";

export async function createAddressApi(formData, logout) {
  try {
    const url = `${BASE_PATH}/addresses`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressesApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/addresses?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAddressesApi(idAddress, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "Error del servidor";
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateAddressApi(idAddress, formData, logout) {
  try {
    const url = `${BASE_PATH}/addresses/${idAddress}`;

    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
