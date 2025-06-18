import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dataPath = path.resolve("src/data/categories.json");

// Helper functie om data te lezen
const readCategories = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

// Helper functie om data te schrijven
const writeCategories = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET /categories
export const getAllCategories = (req, res) => {
  const categories = readCategories();
  res.json(categories);
};

// POST /categories
export const createCategories = (req, res) => {
  const newCategorie = {
    id: uuidv4(),
    ...req.body, // alles wat client meestuurt
  };

  categories.push(newCategorie);
  saveData("categories", categories); // Schrijft event weg naar de JSON-file
  res.status(201).json(newCategorie);
};

// PUT /categories
export const updateCategorie = (req, res) => {
  const event = categories.find((categorie) => categorie.id === req.params.id);

  if (!categorie) {
    return res.status(404).json({ message: "Categorie not found" });
  }

  Object.assign(categorie, req.body); // overschrijft alleen de velden die wél in req.body staan

  saveData("categories", categories);
  res.json(categorie);
};