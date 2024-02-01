const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
const mongoURL = 'mongosh://localhost:27017/admin';
const formDataSchema = new mongoose.Schema({
  name: String,
  usn: String,
  order: String,
  additional: String,
  quantity: Number,
  time: Date,
  transaction: String,
  message: String
});
const FormData = mongoose.model('FormData', formDataSchema);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'body.html'));
});
app.post('/contact', (req, res) => {
  const formData = new FormData({
    name: req.body.name,
    usn: req.body.usn,
    order: req.body.order,
    additional: req.body.additional,
    quantity: req.body.quantity,
    time: req.body.time,
    transaction: req.body.transaction,
    message: req.body.message
  });
  formData.save((err, savedData) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.sendStatus(500);
      return;
    }

    console.log('Form data saved:', savedData);
    res.send('Form submitted successfully!');
  });
});
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const port = 3000;
    app.listen(port, () => {
      console.log(Server is running on port${port});
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });