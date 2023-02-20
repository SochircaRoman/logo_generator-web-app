export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = JSON.parse(localStorage.getItem("accesToken"));

  if (user && accessToken) {
    // for Node.js Express back-end
    return { "x-access-token": accessToken };
  } else {
    return {};
  }
}