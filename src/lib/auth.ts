export const setAuthCookie = () => {
  // Use SameSite=Lax without Secure on non-HTTPS (localhost) so it works in dev too.
  // Secure flag is only needed in production (HTTPS).
  const isSecure = location.protocol === "https:";
  document.cookie = `firebase-auth=true; path=/; max-age=86400; SameSite=Lax${isSecure ? "; Secure" : ""}`;
};

/**
 * Sets the auth cookie then does a HARD navigation (not client-side push).
 * This is critical: it forces the browser to send the cookie in the request
 * headers on the very next request, so the Edge middleware sees it immediately.
 */
export const setAuthCookieAndRedirect = (path: string) => {
  setAuthCookie();
  window.location.href = path;
};
