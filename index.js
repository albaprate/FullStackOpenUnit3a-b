const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const people = persons.length;
  const time = new Date();
  response.send(`<p>Phonebook has info for ${people}</p><p>${time}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

morgan.token("body", (req) => JSON.stringify(req.body));
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const nameExists = persons.find((p) => p.name === body.name);

  if ((nameExists && !body.number) || (nameExists && body.number)) {
    response.status(400).json({ error: "Name must be unique" });
  } else if (!body.name | !body.number) {
    response.status(400).json({ error: "Name or number is missing" });
  } else {
    const newPerson = {
      id: Math.floor(Math.random() * 100),
      name: body.name,
      number: body.number,
    };

    persons = persons.concat(newPerson);
    response.json(persons);
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
