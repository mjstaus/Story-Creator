/// Users

/**
 * Add a new user to the database.
 * @param {{name: string, email: string, password: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
 const addUser = (user) => {
  const { name, email, password } = user;
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `;
  return db.query(queryString, [name, email, password])
    .then(res => {
      return res.rows[0];
    });
};
exports.addUser = addUser;

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email) => {
  const queryString = `SELECT * FROM users WHERE email = $1`;
  return db.query(queryString, [email])
    .then(res => {
      return res.rows[0];
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1`;
  return db.query(queryString, [id])
    .then(res => {
      return res.rows[0];
    });
};
exports.getUserWithId = getUserWithId;


/// Stories

/**
 * Add a story to the database
 * @param {{}} story An object containing all of the story details.
 * @return {Promise<{}>} A promise to the stories.
 */
 const addStory = function(story) {
  const { userID, title, initialContent } = story;
  const queryParams = [userID, title, initialContent];
  const queryString = `
  INSERT INTO stories (user_id, title, initial_content)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;
  return db.query(queryString, queryParams)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addStory = addStory;

/**
 * Get all in-progress stories.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>} A promise to the stories.
 */
const getAllInProgressStories = (limit = 10) => {
  const queryString = `
  SELECT title, initial_content
  FROM stories
  WHERE complete = FALSE
  ORDER BY id DESC
  LIMIT $1
  `;
  return db.query(queryString, [limit])
    .then(res => {
      return res.rows;
    });
};
exports.getAllInProgressStories = getAllInProgressStories;

/**
 * Get all completed stories.
 * @param {string} limit Number limit of responses.
 * @return {Promise<[{}]>} A promise to the stories.
 */
 const getAllCompletedStories = (db, limit = 10) => {
  const queryString = `
  SELECT initial_content
  FROM stories
  WHERE complete = TRUE
  ORDER BY id DESC
  LIMIT $1
  `;
  return db.query(queryString, [limit])
    .then(res => {
      return res.rows;
    });
};
exports.getAllCompletedStories = getAllCompletedStories;

/**
 * Get all stories for a single user.
 * @param {string} userID The id of the user.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>} A promise to the stories.
 */
 const getAllUserStories = (userID, limit = 10) => {
  const queryString = `
  SELECT initial_content
  FROM stories
  WHERE user_id = $1
  ORDER BY id DESC
  LIMIT $2
  `;
  return db.query(queryString, [userID, limit])
    .then(res => {
      return res.rows;
    });
};
exports.getAllUserStories = getAllUserStories;

/// Contributions

/**
 * Get all contributions for a single user.
 * @param {string} userID The id of the user.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>} A promise to the stories.
 */
 const getAllUserContributions = (userID, limit = 10) => {
  const queryString = `
  SELECT content
  FROM contributions
  WHERE user_id = $1
  ORDER BY user_id DESC
  LIMIT $2
  `;
  return db.query(queryString, [userID, limit])
    .then(res => {
      return res.rows;
    });
};
exports.getAllUserContributions = getAllUserContributions;

/**
 * Get all contributions for a chosen story.
 * @param {string} storyID The id of the story.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>} A promise to the stories.
 */
 const getAllContributions = (storyID, limit = 10) => {
  const queryString = `
  SELECT users.name, count(contribution_votes.contribution_id) AS votes, content
  FROM contribution_votes
  JOIN users ON users.id = contribution_votes.contribution_id
  JOIN contributions ON contributions.id = contribution_id
  WHERE contribution_votes.story_id = $1
  AND contributions.accepted = FALSE
  AND contributions.archived = FALSE
  GROUP BY users.name, contribution_votes.contribution_id, contributions.content
  ORDER BY votes DESC
  LIMIT $2
  `;
  return db.query(queryString, [storyID, limit])
    .then(res => {
      return res.rows;
    });
};
exports.getAllContributions = getAllContributions;

module.exports = { addUser, getUserWithEmail, getUserWithId, addStory, getAllInProgressStories, getAllCompletedStories, getAllUserStories, getAllContributions, }

