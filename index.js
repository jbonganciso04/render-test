const express = require('express');


const app = express();

const cors = require('cors')

app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    
    response.send(
    `<p>Phonebook has info for ${persons.length}</p>
    <br />
    <p>${new Date().toString()}</p> `   
    )
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);

    if(person) {
        response.json(person)
    } else {
        response.status(404).end();
    }
})

app.delete("/api/persons/:id", (request, response) => {
    console.log(request.params.id);
    const id = Number(request.params.id);
    const person = persons.find((p) => p.id === id);

    if(person) {
        persons = persons.filter(p => p.id !== id);
        
        response.status(204).end();
    } else {
        response.status(404).end();
    }
} )

app.post("/api/persons", (request, response) => {
    const body = request.body;

    if(!body.name) {
        response.status(404).json({
            error: 'Name missing'
        })
    }


    if(!body.number) {
        response.status(404).json({
            error: 'Number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person);
    response.json(person)
})


const PORT = 3001;
app.listen(PORT);