/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id/dashboard", (req, res) => {
    res.render("users/dashboard");
  });
  router.get("/:id/stories", (req, res) => {
    db.query(`
    SELECT *
    FROM stories
    WHERE user_id = $1
    ORDER BY id DESC;
    `, [req.params.id])
      .then((data) => {
        const templateVars = { stories: data.rows };
        res.render("users/users_stories", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/:id/contributions", (req, res) => {
    db.query(`
    SELECT *
      FROM contributions
      WHERE user_id = $1;
    `, [req.params.id])
      .then((data) => {
        const templateVars = { contributions: data.rows };
        res.render("users/users_contributions", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/stories", (req, res) => {
    db.query(`
    SELECT *
      FROM stories
      WHERE user_id = $1;
    `, [req.params.id])
      .then((data) => {
        const templateVars = { stories: data.rows };
        console.log(templateVars)
        res.render("users/users_stories", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    });
  return router;
};
