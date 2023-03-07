const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;
app.use(express.json());


//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (req, res) => {
    const data = await Restaurant.findAll()
    return res.json(data)
})

app.get("/restaurants/:id",async (req, res) => {
    const id = req.params.id
    const data = await Restaurant.findByPk(id)
    res.json(data)
})

app.delete('/restaurants/:id', async(req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)

    await restaurant.destroy()
})

app.post('/restaurants', async (req, res) => {
    const newRestaurant = Restaurant.build({
        name: req.body.name,
        location: req.body.location,
        cuisine: req.body.cuisine
    })
    await newRestaurant.save()
})

app.put('/restaurants/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    await restaurant.update(req.body)
})

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})