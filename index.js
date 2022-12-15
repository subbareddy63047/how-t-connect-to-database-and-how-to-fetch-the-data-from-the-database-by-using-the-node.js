const express = require("express");
const app = express();

const sqlite = require("sqlite");
const path = require("path");
const { open } = sqlite;
const sqlite3 = require("sqlite3");
let db = null;
const dbPath = path.join(__dirname, "goodreads.db");

const initializeAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB error:${error.message}`);
    process.exit(1);
  }
};
initializeAndServer();

app.get("/books/", async (request, response) => {
  const getBookQuery = `
    SELECT 
    *
    FROM 
    book
    ORDER BY  
    book_id;`;
  const bookArray = await db.all(getBookQuery);
  response.send(bookArray);
});
