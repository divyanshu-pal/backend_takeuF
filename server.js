const express = require('express');

const mysql = require('mysql');
const cors = require('cors');

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_database
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});


app.get('/banner', (req, res) => {
  let sql = 'SELECT * FROM banner WHERE id = 1';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});


app.post('/banner', (req, res) => {
  const { description, timer, link, visible } = req.body;
  let sql = `UPDATE banner SET description = ?, timer = ?, link = ?, visible = ? WHERE id = 1`;
  db.query(sql, [description, timer, link, visible], (err, result) => {
    if (err) throw err;
    res.send('Banner updated');
  });
});

app.listen(process.env.PORT||5000, () => {
  console.log('Server started on port 5000');
});
