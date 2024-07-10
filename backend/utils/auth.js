export const setAuthCookie = (res, token) => {
  res.cookie('mern_jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  });
};
