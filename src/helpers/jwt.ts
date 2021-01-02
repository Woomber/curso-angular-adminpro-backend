import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "secret_key";

export const generarToken = (id: string) => {
  const payload = { id };
  try {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: "24h",
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const verificarToken = (token: string) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};
