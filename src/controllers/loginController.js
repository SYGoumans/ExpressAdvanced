import jwt from "jsonwebtoken";
import path from "path";

const dataPath = path.resolve("src/data/users.json");

// Helper functie om data te lezen
const readUsers = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

export const loginUser = (req, res) => {
  const users = readUsers();
  res.json(users);

  // Controle: zijn beide velden aanwezig?
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required." });
  }

  // Bestaat de gebruiker?
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // JWT token maken
  const token = jwt.sign(
    { id: user.id, username: user.username }, // payload
    process.env.JWT_SECRET, // geheime sleutel
    { expiresIn: "1h" } // token 1 uur geldig
  );

  res.json({ token });
};
