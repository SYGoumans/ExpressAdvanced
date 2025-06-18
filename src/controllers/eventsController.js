import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const dataPath = path.resolve("src/data/events.json");

// Helper functie om data te lezen
const readEvents = () => {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
};

// Helper functie om data te schrijven
const writeEvents = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET /events
export const getAllEvents = (req, res) => {
  const events = readEvents();
  res.json(events);
};

// POST /events
export const createEvent = (req, res) => {
  const newEvent = {
    id: uuidv4(),
    ...req.body, // alles wat client meestuurt
  };

  events.push(newEvent);
  saveData("events", events); // Schrijft event weg naar de JSON-file
  res.status(201).json(newEvent);
};

// PUT /events
export const updateEvent = (req, res) => {
  const event = events.find((event) => event.id === req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  Object.assign(event, req.body); // overschrijft alleen de velden die wél in req.body staan

  saveData("events", events);
  res.json(event);
};
