import morgan from 'morgan';
import 'dotenv/config';
import express from 'express';
import dotenv from 'dotenv';


const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.render('home', { title: 'Easy GE Course Selector' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});

