import fs from "fs";
import path from "path";

const dataPath = path.resolve("src/data/users.json");

// Helper functie om data te lezen
const readUsers = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

// Helper functie om data te schrijven
const writeUsers = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET /users
export const getAllUsers = (req, res) => {
  const users = readUsers();
  res.json(users);
};

// POST /users
export const createUser = (req, res) => {
  const users = readUsers();
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    ...req.body,
  };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
};

// PUT /users
export const updateUser = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);

  if (!user) {
    return res.status(404).json({ message: "Users not found" });
  }

  Object.assign(user, req.body); // overschrijft alleen de velden die wél in req.body staan

  saveData("users", users);
  res.json(user);
};