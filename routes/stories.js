const express = require("express");
const { renderSync } = require("sass");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM stories;`)
      .then((data) => {
        const templateVars = { stories: data.rows };
        res.render("stories/stories_index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/inprogress", (req, res) => {
    db.query(`
    SELECT *
    FROM stories
    WHERE complete = FALSE
    ORDER BY id DESC;
    `)
      .then((data) => {
        const templateVars = { stories: data.rows };
        res.render("stories/stories_index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/complete", (req, res) => {
    db.query(`
    SELECT *
    FROM stories
    WHERE complete = TRUE
    ORDER BY id DESC;
    `)
      .then((data) => {
        const templateVars = { stories: data.rows };
        res.render("stories/stories_index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    db.query(`
    SELECT *
    FROM stories
    WHERE id = $1
    ORDER BY id DESC;
    `, [req.params.id])
      .then((data) => {
        const templateVars = { stories: data.rows };
        res.render("stories/stories_index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/contributions", (req, res) => {
    res.send("View all contributions for a story");
  });

  router.get("/:id/contributions/:id", (req, res) => {
    res.send("View one contribution");
  });

  router.post("/", (req, res) => {
    res.send("Create new story");
  });

  router.post("/:id", (req, res) => {
    res.send("Edit story");
  });

  router.post("/:id/contributions", (req, res) => {
    res.send("Create new contribution");
  });

  router.post("/:id/contributions/:id", (req, res) => {
    res.send("Edit contribution");
  });

  router.post("/:id/delete", (req, res) => {
    res.send("Delete story");
  });

  router.post("/:id/contributions/:id/delete", (req, res) => {
    res.send("Edit story status");
  });

  // router.post()
  return router;
};
