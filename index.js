// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');
const fs = require("fs")

const app = express();

const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use(express.json());

let students = [];

fs.readFile('./data.json', (err, data) => {
  if (err) {
    console.log('Error reading the file:', err);
    return;
  }
  try {
    students = JSON.parse(data);
  } catch (err) {
    console.log('Error parsing JSON:', err);
  }
});

app.post('/students/above-threshold', (req,res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number'){
    return res.status(400).json({ error: "Threshold must be a number." });

  }

  const filteredStudents = students.filter((el) => {
    return el.total > threshold;
  });
  
  res.json({
    count: filteredStudents.length,
    students: filteredStudents.map((el) => {
    return {name: el.name, total: el.total}
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


