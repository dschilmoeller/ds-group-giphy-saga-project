const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
  const queryText = `SELECT favorites.id, src, name, category_id
  FROM favorites
  LEFT OUTER JOIN category ON favorites.category_id = category.id
  ORDER BY category_id`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error completing SELECT favorite query", err);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post("/", (req, res) => {
  res.sendStatus(200);
});

// update given favorite with a category id
router.put("/:favId/:categoryId", (req, res) => {
  console.log(req.params);
  // req.body should contain a category_id to add to this favorite image
  // NOTE: NEEDS WORK
  
  const queryText = `UPDATE favorites
  SET category_id = $1
  WHERE id = $2;`;

  pool.query(queryText, [req.params.categoryId, req.params.favId])
  .then( () => {res.sendStatus(200);})
  .catch(err => {
    console.log('error changing category in db', err);
    res.sendStatus(500);
  });
  //res.sendStatus(200);
});

// delete a favorite
router.delete("/", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
