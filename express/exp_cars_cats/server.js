const express = require("express");
const app = express();
app.use(express.static(__dirname + "/static"));
app.get('/', (request, response) => {
   response.render('index');
});
app.listen(8000, () => console.log("listening on port 8000"));