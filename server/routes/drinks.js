const router = require('express').Router();
const mysql = require('mysql');
const Promise = require('bluebird')

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

let queryAsync = Promise.promisify(db.query.bind(db));

// Create
// router.get('/', (req, res) => {
//     const sqlInsert = "INSERT INTO drinks (drinkName, drinkThumb, drinkAlcoholic, drinkIngredient1, drinkIngredient2, drinkIngredient3, drinkIngredient4, drinkPrice) VALUES ('GG', 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg', true, 'Galliano', 'Ginger ale', 'Ice', '', 10)";
//
//     db.query(sqlInsert, (err, result) => {
//         if (err) {
//             console.log(err);
//             if (err.code === 'ER_DUP_ENTRY'){
//                 res.status(403).send(err);
//             }
//         }
//         if (result) {
//             console.log(result);
//             res.send(result);
//         }
//     })
// })


// READ
// router.get('/', async (req, res) => {
//     const sqlSelect = "SELECT * FROM drinks";
//     db.query(sqlSelect, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send({code: "SERVER_ERROR", status: 500});
//         }
//         if (result) {
//             res.status(200).send(result);
//         }
//     })
// })

// function pagination(model) {
//     console.log(model)
//     return async (req, res, next) => {
//         let numRows;
//         let numberPerPage = parseInt(req.query.npp) || 9;
//         let page = parseInt(req.query.page) || 1;
//         let totalPages;
//         const startIndex = (page - 1) * numberPerPage;
//         const results = {}
//         queryAsync(`SELECT count(*) as numRows
//                     FROM ${model}`)
//             .then((result) => {
//                 numRows = result[0].numRows;
//                 totalPages = Math.ceil(numRows / numberPerPage);
//             })
//             .then(() => {
//                 queryAsync(`SELECT *
//                             FROM ${model}
//                             ORDER BY ID ASC LIMIT ${numberPerPage}
//                             OFFSET ${startIndex}`)
//             })
//             .then((data) => {
//                 results.results = {data};
//                     // let responsePayload = {data};
//                     if (page <= totalPages) {
//                         results.pagination = {
//                             current: page,
//                             perPage: numberPerPage,
//                             previous: page > 1 ? page - 1 : null,
//                             next: page < totalPages ? page + 1 : null,
//                             totalPages
//                         }
//                     } else {
//                         results.pagination = {err: 'queried page ' + page + ' is > to maximum page number ' + totalPages}
//                     }
//                     console.log(results)
//                     // res.status(200).send(responsePayload);
//                 res.pagination = results
//                 }
//             ).catch((err) => {
//             console.error(err);
//             res.status(500).send({code: "SERVER_ERROR", status: 500});
//         })
//     }
// }

router.get('/',  (req, res) => {
    let numRows;
    let numberPerPage = parseInt(req.query.npp) || 9;
    let page = parseInt(req.query.page) || 1;
    let totalPages;
    const startIndex = (page - 1) * numberPerPage;
    queryAsync('SELECT count(*) as numRows FROM drinks')
        .then((result) => {
            numRows = result[0].numRows;
            totalPages = Math.ceil(numRows / numberPerPage);
        })
        .then(() => queryAsync(`SELECT *
                                FROM drinks
                                ORDER BY ID ASC LIMIT ${numberPerPage}
                                OFFSET ${startIndex}`))
        .then((drinks) => {
            let responsePayload = {drinks};
            if (page <= totalPages) {
                responsePayload.pagination = {
                    current: page,
                    perPage: numberPerPage,
                    previous: page > 1 ? page - 1 : null,
                    next: page < totalPages ? page + 1 : null,
                    totalPages
                }
            } else {
                responsePayload.pagination = {err: 'queried page ' + page + ' is > to maximum page number ' + totalPages}
            }
            res.status(200).send(responsePayload);
        }).catch((err) => {
        console.error(err);
        res.status(500).send({code: "SERVER_ERROR", status: 500});
    })
})

// router.get('/', pagination('drinks'), (req, res) => {
//     res.send(res.pagination);
// })

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const sqlSelect = "SELECT * FROM drinks WHERE id = ?";
    db.query(sqlSelect, id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({code: "SERVER_ERROR", status: 500});
        }
        if (result) {
            res.status(200).send(result);
        }
    })
})

router.get('/search/:searchString', (req, res) => {
    console.log(789);
    // const searchString = {stringPart: req.body.typehead};
    const searchString = req.query.key;
    console.log(searchString);
    // const sqlFilter = 'SELECT * FROM drinks WHERE (drinkName) REGEXP ';
    const sqlFilter = 'SELECT * FROM drinks WHERE (drinkName) LIKE "%'+searchString+'%"';
    db.query(sqlFilter, (err, result) => {
        if(err) console.log(err)
        console.log(result)
    })
    res.send({searchString});
})

module.exports = router;