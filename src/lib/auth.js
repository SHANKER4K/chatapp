import Cookies from "js-cookie";
export const storeTokenInCookie = (token) => {
  Cookies.set("supabase_token", token, { expires: 7 }); // Expires in 7 days
};

export const getTokenFromCookie = () => {
  return Cookies.get("token");
};

export const removeTokenFromCookie = () => {
  Cookies.remove("token");
};
