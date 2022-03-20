import { BASE_PATH } from "../utils/constants";

export async function getLastGamesApi(limit) {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `&_sort=createdAt:desc`;
    const url = `${BASE_PATH}/games?${limitItems}${sortItems}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGamesPlatformApi(platform, limit, start) {
  try {
    const limitItems = `&_limit=${limit}`;
    const sortItems = `&_sort=createdAt:desc`;
    const startItems = `&_start=${start}`;
    const url = `${BASE_PATH}/games?platform.url=${platform}${limitItems}${sortItems}${startItems}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGameByUrlApi(path) {
  try {
    const url = `${BASE_PATH}/games?url=${path}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
