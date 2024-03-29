import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/authFetch";

export async function getOrdersApi(idUser, logout) {
  try {
    const url = `${BASE_PATH}/orders?_sort=createdAt:desc&user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
