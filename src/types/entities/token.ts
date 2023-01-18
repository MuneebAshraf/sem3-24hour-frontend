import Permission from "./permission";

interface Token {
  ID: number;
  username: string;
  fname: string;
  lname: string;
  pms?: Permission;
}

export default Token;
