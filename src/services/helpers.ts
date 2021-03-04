export function checkEmail(user) {
  if (
    user?.email === null ||
    user?.email === undefined ||
    user?.email === "null" ||
    user?.email === "undefined"
  ) {
    return false;
  }
  return true;
}
