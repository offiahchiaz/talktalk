const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/talktalk', 
{ useNewUrlParser: true,  useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'First Blog Post',
//   image: 'https://images.unsplash.com/photo-1606788073305-5f071cb80485?ixid=MXwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
//   body: 'First blog body'
// });

// RESTFUL ROUTESS

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    }

    res.render('/blogs', { blogs });
  });
});

app.listen(4000, () => {
  console.log(`Talktalk server up and running!`);
});
