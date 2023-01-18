import Token from "@/types/entities/token";
import API from "@/api/";
import Permission from "../types/entities/permission";
import Role from "../types/entities/permission";


function decodeJwt() {
  const token = API.helpers.getToken();
  if (!token) return undefined;
  const jwtData = token.split(".")[1];
  const decodedJwtJsonData = window.atob(jwtData);
  const decodedJwtData = JSON.parse(decodedJwtJsonData);
  return decodedJwtData;
}

function getID(jwt: { ID: number; }) {
  return jwt && jwt.ID;
}
function getUsername(jwt: { username: string; }) {
  return jwt && jwt.username;
}
function getPermission(jwt: { pms: string; }) {
  if (!jwt || !jwt.pms) return false;
  return jwt.pms as Permission;
}
function getFname(jwt: { fname: string; }) {
  return jwt && jwt.fname;
}
function getLname(jwt: { lname: string; }) {
  return jwt && jwt.lname;
}


function getUserInfo(): Token {
  const jwtData = decodeJwt();
  return {
    ID: getID(jwtData),
    username: getUsername(jwtData),
    fname: getFname(jwtData),
    lname: getLname(jwtData),
    pms: getPermission(jwtData) || undefined
  };
}

export {
  getUserInfo
};
