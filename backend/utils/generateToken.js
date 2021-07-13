import jwt from "jsonwebtoken";

const jwtSecret = "abc123";

const generateToken = (id) => {
  return jwt.sign({ id: id }, jwtSecret, {
    expiresIn: "30d",
  });
};

export default generateToken;
