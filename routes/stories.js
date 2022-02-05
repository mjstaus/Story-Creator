const express = require("express");
const { renderSync } = require("sass");
const router = express.Router();

module.exports = (db) => {

  //View all stories
  router.get("/", (req, res) => {
    const queryString = `SELECT * FROM stories;`
    db.query(queryString)
      .then((data) => {
        const templateVars = { stories: data.rows };
        console.log(templateVars);
        res.render("stories/stories_index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/new", (req, res) => {
    res.render("stories/stories_new")
  })

  //View all in-progress stories
  router.get("/inprogress", (req, res) => {
    const queryString = `
      SELECT *
        FROM stories
        WHERE complete = FALSE
        ORDER BY id DESC;`;
    db.query(queryString)
      .then((data) => {
        const templateVars = { stories: data.rows };
        res.render("stories/stories_index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //View all completed stories
  router.get("/complete", (req, res) => {
    const queryString = `
      SELECT *
        FROM stories
        WHERE complete = TRUE
        ORDER BY id DESC;`;
    db.query(queryString)
      .then((data) => {
        const templateVars = { stories: data.rows };
        res.render("stories/stories_index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //View one story
  router.get("/:id", (req, res) => {
    const queryString = `
      SELECT *
        FROM stories
        WHERE id = $1;`;
    db.query(queryString, [req.params.id])
      .then((data) => {
        const templateVars = { stories: data.rows[0] };
        console.log(templateVars);
        res.render("stories/stories_show", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //View all contributions for story
  router.get("/:id/contributions", (req, res) => {
    const queryString = `
      SELECT contributions.user_id, users.name, count(contribution_votes.contribution_id) AS votes, contributions.content
        FROM contribution_votes
        RIGHT JOIN contributions ON contribution_id = contributions.id
        JOIN users ON contributions.user_id = users.id
        WHERE contributions.story_id = $1
        AND contributions.accepted = FALSE
        AND contributions.archived = FALSE
        GROUP BY contributions.id, users.name, contribution_votes.contribution_id, contributions.content, contributions.user_id
        ORDER BY votes DESC;`;
    db.query(queryString, [req.params.id])
      .then((data) => {
        const templateVars = { contributions: data.rows };
        console.log(templateVars);
        res.render("stories/stories_contributions", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Create new story// !!!NEED TO ADD USERID!!!
  router.post("/new", (req, res) => {
    // const userId = req.session.userId;
    const { title, initialContent } = req.body;

    const queryParams = [title, initialContent];
    const queryString = `
          INSERT INTO stories (user_id, title, initial_content)
          VALUES (1, $1, $2)
          RETURNING *;
        `;
      const query = {
        text: queryString,
        values: queryParams,
      };

    db.query(query)
      .then((story) => {
        // const templateVars = { story: data.rows };
        // console.log(templateVars);
        console.log(res.body)
        res.redirect("/users/1/stories"); //redirect to user's stories vs. show page for newly added story
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.post('/properties', (req, res) => {
  //   const userId = req.session.userId;
  //   database.addProperty({...req.body, owner_id: userId})
  //     .then(property => {
  //       res.send(property);
  //     })
  //     .catch(e => {
  //       console.error(e);
  //       res.send(e)
  //     });
  // });

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
