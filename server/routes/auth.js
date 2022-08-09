const router = require('express').Router();
const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

// Register
router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO login (username, password) VALUES (?, ?)";
    db.query(sqlInsert, [username, password], (err, result) => {
        if (err) {
            console.log(err);
            if (err.code === 'ER_DUP_ENTRY') {
                res.status(403).send(err)
            }
        }
        if (result) {
            console.log(result);
            res.status(200).send(result);
        }
    })
})

// Login
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlSelect = "SELECT * FROM login WHERE username = ?";
    db.query(sqlSelect, username, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        if (result) {
            if (result.length > 0) {
                res.status(200).send(result);
            } else res.status(403).send({code: 'NOT_EXIST', status: 403});
        }
    })
})
module.exports = router;
