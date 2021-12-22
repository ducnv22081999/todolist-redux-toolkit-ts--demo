import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://618a486f34b4f400177c4541.mockapi.io/",
  // headers: {
  //     'Content-Type': "multipart/form-data"
  // },
});
