//importo express
const express = require("express");

//importo cors
const cors = require("cors");

//creo instanza app attraverso express
const app = express();

//definisco la porta
const port = process.env.PORT

//importo router
const productRouter = require("./routers/productRouter.js")
const notFound = require("./middleware/notFound");


//dico ad express di utilizzare public
app.use(express.static('public'));

app.use(express.json());

//creo la rotta base
app.get("/", (req, res) => {
    res.send("Rotta base del sito")
})

app.use(cors({
    origin: process.env.FE_APP
}));

//dico all'app di utilizzare il router
app.use("/products", productRouter);

//middleware se nessuna rotta ha risposto
app.use(notFound);

//dico all'app di rimanere in ascolto
app.listen(port, () => {
    console.log(`Server in ascolto alla porta: ${process.env.PORT}`)
})