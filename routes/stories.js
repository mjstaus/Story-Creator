const express = require("express");
const { renderSync } = require("sass");
const router = express.Router();

module.exports = (db) => {
  //View all stories
  router.get("/", (req, res) => {
    const queryString = `SELECT * FROM stories;`;
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
    res.render("stories/stories_new");
  });

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
      SELECT stories.*, contributions.content
        FROM stories
        JOIN contributions ON stories.id = contributions.story_id
        WHERE id = $1
        AND contributions.accepted = TRUE;`;
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

  //Show one
  router.get("/contributions/:id", (req, res) => {

  })

  //Create new story//
  router.post("/new", (req, res) => {
    const { title, initialContent } = req.body;

    const queryParams = [title, initialContent];
    const queryString = `
          INSERT INTO stories (user_id, title, initial_content)
          VALUES (1, $1, $2)
          RETURNING *;`;
    const query = {
      text: queryString,
      values: queryParams,
    };

    db.query(query)
      .then((data) => {
        res.redirect(`/stories/${data.rows[0].id}`); //redirect to show page for newly created story
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Edit a story !!! NOT WORKING YET !!!
  // router.post("/:id", (req, res) => {
  //    // const userId = req.session.userId;
  //    const { title, initialContent } = req.body;

  //    const queryParams = [title, initialContent];
  //    const queryString = `
  //          UPDATE stories
  //          SET (title, initial_content)
  //          VALUES ($1, $2)
  //          WHERE id = ${req.params}
  //          RETURNING *;
  //        `;
  //      const query = {
  //        text: queryString,
  //        values: queryParams,
  //      };

  //    db.query(query)
  //      .then((data) => {
  //        const templateVars = { story: data.rows };
  //        console.log(templateVars);
  //        res.redirect(`/`); //redirect to user's stories vs. show page for newly added story
  //      })
  //      .catch((err) => {
  //        res.status(500).json({ error: err.message });
  //      });
  // });

  //CREATE NEW CONTRIBUTION
  router.post("/:id/contributions", (req, res) => {
    const { content } = req.body;
    const story_id = Number(req.params.id);

    const queryParams = [1, story_id, content];
    const queryString = `
        INSERT INTO contributions (user_id, story_id, content)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
    const query = {
      text: queryString,
      values: queryParams,
    }
    db.query(query)
      .then((data) => {
        res.redirect(`/stories/${data.rows[0].story_id}/contributions`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:id/contributions/:id", (req, res) => {
    res.send("Edit contribution");
  });

  // router.post("/:id/delete", (req, res) => {
  //   res.send("Delete story");
  // });

  router.post("/:id/contributions/:id/delete", (req, res) => {
    res.send("Edit story status");
  });

  router.post("/contributions/:id", (req, res) => {

  })
  //Accepeted = true for accepted contribution

  // router.post()
  return router;
};
