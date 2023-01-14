import axios from "axios";

//export const BASE_URL = "https://localhost:72871/";
export const BASE_URL = "https://localhost:44389/";

export const ENDPOINTS = {
  participants: "participants",
  questions: "questions",
};

export const BackendAPI = (endpoint: any) => {
  let url = BASE_URL + "api/" + endpoint + "/";

  return {
    get: () => axios.get(url),
    getById: (id: number) => axios.get(url + id),
    getByString: (id: string) => axios.get(url + id),
    post: (bookingAdd: any) => axios.post(url, bookingAdd),
    put: (id: any, item: any) => axios.put(url + id, item),
    delete: (id: any) => axios.delete(url + id),
  };
};

export const TodoAPI = () => {
  let url = "https://jsonplaceholder.typicode.com/todos/1";
  return {
    fetch: () => axios.get(url),
  };
};
