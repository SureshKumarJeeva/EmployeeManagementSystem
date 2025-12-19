import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ems-secret-key";
const JWT_EXPIRES_IN = "7d";

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function getUserFromToken(authHeader) {
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");

  try {
    const token = authHeader.replace("Bearer ", "");
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}