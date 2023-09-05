const cors = require("cors");
const express = require("express");
const app = express();


var corsOptions = {
    origin: "http://localhost:8081"
}
    
    app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Banco Conectado!");
    })
    .catch((err) => {
        console.log("Falha ao acessar banco de dados: " + err.message);
    });

    require("./app/routes/item.routes")(app);

app.get("/", (req,res)=>{
    res.json({message: 'Hello World!'})
});

const port = process.env.port || 8088;
app.listen(port, () => {
    console.log(`Server funcionando na porta ${port}.`);
})