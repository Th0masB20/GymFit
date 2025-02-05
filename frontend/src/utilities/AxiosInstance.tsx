import axios from "axios";

const axios_instance = axios.create({
  withCredentials: true,
});

axios_instance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    //used to create new entry, retry. originally false, then set to true
    const original_request = error.config;
    try {
      if (error.response.data.error == "Access Token Expired") {
        const ticket_response = await axios.get("/refresh", {
          withCredentials: true,
        });
        if (ticket_response.status == 200) {
          return axios(original_request);
        }
      }
    } catch (final_error) {
      console.log(final_error);
      return final_error;
    }

    return error;
  }
);

export default axios_instance;
