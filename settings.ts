const loc = document.location;
let api_loc = "https://cod3r.dk/WalkieDoggie/api";
if (loc.href.includes("localhost") || loc.href.includes("127.0.0.1")) api_loc = "http://localhost:8080/WalkieDoggie/api";

const BASE_API_URL = api_loc;
// const BASE_API_URL = "http://localhost:8080/api";
export {
  BASE_API_URL
};
