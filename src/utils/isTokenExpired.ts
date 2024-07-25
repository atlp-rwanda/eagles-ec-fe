import { decodeToken } from "react-jwt";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const isTokenExpired = (token: string | null) => {
  if (!token) {
    return true;
  }
  try {
    const decodedToken = decodeToken<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken) {
      return decodedToken.exp < currentTime;
    }
    return false;
  } catch (error) {
    return true;
  }
};

export default isTokenExpired;
