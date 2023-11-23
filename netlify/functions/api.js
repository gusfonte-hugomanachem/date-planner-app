import axios from "axios";

export const handler = async (event, context) => {
  const API_KEY = process.env.API_KEY;

  const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=Function.prototype`;

  const response = await axios.get(API_URL);

  console.log("api js used!", response);

  return {
    statusCode: 200,
    body: JSON.stringify(response.data),
  };
};
