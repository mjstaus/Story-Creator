/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //Show dashboard for given user
  router.get("/:id/dashboard", (req, res) => {
    res.render("users/dashboard");
  });

  //Show User's Stories
  router.get("/:id/stories", (req, res) => {
    const queryString = `
      SELECT stories.*, users.name, users.avatar
        FROM stories
        JOIN users ON stories.user_id = users.id
        WHERE user_id = $1;`

    db.query(queryString, [req.params.id])
      .then((data) => {
        const templateVars = { data: data.rows };
        console.log(templateVars)
        res.render("users/users_stories", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Show User's Contributions
  router.get("/:id/contributions", (req, res) => {
    const queryString =
      `SELECT *
        FROM contributions
        WHERE user_id = $1;`
    db.query(queryString, [req.params.id])
      .then((data) => {
        const templateVars = { contributions: data.rows };
        res.render("users/users_contributions", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  return router;
};
