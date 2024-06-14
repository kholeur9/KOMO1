/**
 * Routes public for all visitors
 * @type {string[]}
*/
export const publicRoutes = [
  "/setting",
]

/**
 * Routes to authentication for komo1 users
 * @type {string[]}
*/
export const authRoutes = [
  "/login",
]


/**
 * Routes redirect after login
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/";