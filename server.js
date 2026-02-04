require("dotenv").config();
const express = require("express");
const app = express();
const codes = require("./routes/codes_routes.js");
const auth =require("./routes/callback_routes.js")
const pool = require("./models/tokens_model.js")

app.get("/", (req, res) => {
res.send("Hello World! i am working on this ghl project with MySQL database");
});


// DB INIT FUNCTION
async function initDatabase() {
    await pool.query("SELECT 1")
}
// INIT DATABASE
initDatabase()
.then(() => {
    console.log("Database initialized")
})
.catch(err => {
    console.error(" Database initialization failed:", err)
})

app.get("/login", codes);
app.use("/oauth", auth);


const PORT = process.env.PORT;
app.listen(PORT, () => {
console.log(` Server running at ${PORT}`);
});