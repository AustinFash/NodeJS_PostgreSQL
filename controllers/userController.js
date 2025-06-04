const queries = require("../db/queries");

// Controller to get all usernames (using queries.js)
async function getUsernames(req, res) {
  try {
    const users = await queries.getAllUsernames(); // retrieves rows from the "usernames" table
    console.log({users})
  } catch (err) {
    res.status(500).send("Error retrieving users: " + err.message);
  }
}

// Controller to render the page for creating a new username
function createUsernameGet(req, res) {
  res.render("index");
}

// Controller to handle the form submission for creating a new username (using queries.js)
async function createUsernamePost(req, res) {
  const { username } = req.body;
  try {
    await queries.insertUsername(username);
    res.redirect("/");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Error creating user: " + err.message);
  }
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost
};