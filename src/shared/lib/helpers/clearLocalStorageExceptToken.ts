export function clearLocalStorageExceptToken() {
  const token = localStorage.getItem("GCToken") as string;
  localStorage.clear();
  if (token) {
    localStorage.setItem("GCToken", token);
  }
}
