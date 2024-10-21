const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const list = [
    {
    "id": 1,
    "name": "Bulbasaur",
    "type": "Grass",
    "height": "0.7",
    },
    {
        "id": 2,
        "name": "Charmander",
        "type": "Fire",
        "height": "0.5",
    },
];
app.post("/item", (req, res) => {
    const item = {
        "id" : req.body.id,
        "name" : req.body.name,
        "type" : req.body.type,
        "height" : req.body.height,
    }
    list.push(item);
    res.send(list);
});
app.get("/items", (req, res) => {
    res.send(list);
});
app.get("/item/:id", (req, res) => {
    const id = req.params.id;
    res.send(list[id]);
});
app.put("/item/:id", (req, res) => {
    const id = req.params.id;
    list[id] = req.body;
    res.send(list);
});
app.delete("/item/:id", (req, res) => {
    const id = req.params.id;
    if(!list[id]) {
        res.send("Item not found");
    }
    list.splice(id, 1);
    res.send(list);
});
app.listen(port, () => {    
    console.log(`the app listening at port ${port}`);
});