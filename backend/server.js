import morgan from 'morgan';
import 'dotenv/config';
import express from 'express';
import pool from "./db.js";


const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.render('home', { title: 'Easy GE Course Selector' });
});

app.get("/courses", async(req, res, next) => {
    try {
        const result = await pool.query("SELECT code, title, category, credits FROM courses ORDER BY title");
        res.render("courses.ejs", {title: "Courses", courses: result.rows});
    }
    catch(err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});

