const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/hello', (req, res) => {
  const { nom } = req.body;

  if (!nom) {
    return res.status(400).json({ missatge: 'Falta el nom' });
  }

  res.json({ missatge: `Hola ${nom}.` });
});

app.listen(3000, () => {
  console.log('Backend escoltant a http://localhost:3000');
});