import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "1234"; // Store this in environment variables

// Function to create a JWT
export const createToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Function to verify a JWT
export const verifyToken = (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (err) {
      console.log(err, "Error----->");
      return null;
    }
  };
