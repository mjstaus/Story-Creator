const express = require('express');
const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req, res) => {
//     db.query(`SELECT * FROM stories;`)
//       .then(data => {
//         const stories = data.rows;
//         res.json({ stories });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   router.post()
//   return router;
// };

module.exports = (db) => {

//All stories
  router.get("/", (req, res) => {
    res.render("stories/stories_index")
  });

  router.get("/:id", (req, res) => {
    res.send('View one story')
  });

  router.get("/:id/contributions", (req, res) => {
    res.send('View all contributions for a story')
  });

  router.get("/:id/contributions/:id", (req, res) => {
    res.send('View one contribution')
  });

  router.post("/", (req, res) => {
    res.send('Create new story')
  });

  router.post("/:id", (req, res) => {
    res.send('Edit story')
  });

  router.post("/:id/contributions", (req, res) => {
    res.send('Create new contribution')
  });

  router.post("/:id/contributions/:id", (req, res) => {
    res.send('Edit contribution')
  });

  router.post("/:id/delete", (req, res) => {
    res.send('Delete story')
  });

  router.post("/:id/contributions/:id/delete", (req, res) => {
    res.send('Edit story status')
  });

  return router;
}
