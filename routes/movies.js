const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
router.use(bodyParser.json());

let pool;

(async function initializePool() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'cinemaville',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
})();
router.get('/', async (req,res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'cinemaville'
      });
   const [results, fields] = await pool.execute('select * from Movies');
   res.send(results);
   


router.get('/movie_list', async (req,res) => {
 
    const [results, fields] = await pool.execute('select title from Movies');
    res.send(results);
})

router.get('/:id', async (req,res) => {
 
      const movieId = req.params.id;
    const [results, fields] = await pool.execute(`select title from Movies where id = ${movieId}`);
    res.send(results);
})
router.use(express.urlencoded());
router.use(express.json());
router.post('/', async (req,res) => {
    
    const newMovie = req.body;  
    // const [results, fields] = await connection.execute(`INSERT INTO Movies (title) VALUES ('${newMovie}')`);
    console.log(newMovie);  
    console.log(req)
});

router.delete('/:id', async (req,res) => {
 
    const delMovie = req.params.id;  
    const [results, fields] = await pool.execute(`DELETE FROM Movies WHERE id = ${delMovie}`);
    console.log(delMovie);
    res.send(results)
})
router.delete('/:id', async (req,res) => {
 
    const delMovie = req.params.id;  
    const [results, fields] = await pool.execute(`DELETE FROM Movies WHERE id = ${delMovie}`);
    console.log(delMovie);
    res.send(results)
})

router.put('/:id', async (req,res) => {
    
    const updateMovieId = req.params.id;
    const updateMovieTitle = req.params.body;  
    const [results, fields] = await pool.execute(`UPDATE Movies SET title = ${updateMovieTitle} WHERE id = ${updateMovieId}`);
    console.log(delMovie);
    res.send(results)
})



})
module.exports = router;