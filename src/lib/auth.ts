export const setAuthCookie = () => {
  document.cookie = `firebase-auth=true; path=/; max-age=86400; SameSite=Lax; Secure`;
};