import axios from "axios";

export const getFunction = () => {
    const response =  axios.get('http://localhost:8080/criticweb/movie', {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTg0OTYyNDgsImV4cCI6MTcxODUzOTQ0OCwic3ViIjoiMSJ9.3XVa4fEaYrKFX4Pc_ju1v5CYDznsg3gqydtcyM9djUY'
      }
    });
    return response;
};