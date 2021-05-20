const express = require('express');
const app = express();

const { syncAndSeed, models: { Person, Place, Thing, Souvenir } } = require('./db');

app.get('/', async (req, res, next) => {
    try{
        const people = await Person.findAll();
        const places = await Place.findAll();
        const things = await Thing.findAll();
        
        res.send()

    }
    catch(err) {
        next(err);
    }
})



const run = async () => {
    try {
        await syncAndSeed();
        console.log('synced and seeded');
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log (`listening on port ${port}`));
    }
    catch(err) {
        console.log(err);
    }
};

run();