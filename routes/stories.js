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
    WHERE id = $1;
    `, [req.params.id])
      .then((data) => {
        const templateVars = { stories: data.rows[0] };
        console.log(templateVars)
        res.render("stories/stories_show", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/contributions", (req, res) => {
    db.query(`
      SELECT users.name, count(contribution_votes.contribution_id) AS votes, content
        FROM contribution_votes
        JOIN users ON users.id = contribution_votes.contribution_id
        JOIN contributions ON contributions.id = contribution_id
        WHERE contribution_votes.story_id = $1
        AND contributions.accepted = FALSE
        AND contributions.archived = FALSE
        GROUP BY users.name, contribution_votes.contribution_id, contributions.content
        ORDER BY votes DESC;`,
      [req.params.id])
      .then((data) => {
        const templateVars = { contributions: data.rows };
        res.render("stories/stories_index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
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
