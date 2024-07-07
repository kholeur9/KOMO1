/**
 * Routes public for all visitors
 * @type {string[]}
*/
export const publicRoutes = [
  "/setting",
  "/aide",
]

/**
 * Routes to authentication for komo1 users
 * @type {string[]}
*/
export const authRoutes = [
  "/login/client",
  "/login/admin",
]


/**
 * Routes redirect after login
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/";