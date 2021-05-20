const Sequelize = require ('sequelize');
const { STRING } = Sequelize;

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_people_places_things');

const data = {
    people: ['moe', 'larry', 'lucy', 'ethyl'],
    places: ['paris', 'nyc', 'chicago', 'london'],
    things: ['foo', 'bar', 'bazz', 'quq']
  };

const Person = db.define('person', {
    name: {
      type: STRING,
      allowNull: false,
      unique: true
    }
});

const Place = db.define('place', {
    name: {
      type: STRING,
      allowNull: false,
      unique: true
    }
});

const Thing = db.define('thing', {
    name: {
      type: STRING,
      allowNull: false,
      unique: true
    }
});

const Souvenir = db.define('souvenir', {
    // personId,
    // placeId,
    // thingId,
})

Souvenir.belongsTo(Person);
Souvenir.belongsTo(Place);
Souvenir.belongsTo(Thing);

Person.hasMany(Souvenir);
Place.hasMany(Souvenir);
Thing.hasMany(Souvenir);

const syncAndSeed = async () => {
    await db.sync ({ force: true });
    await Promise.all(
        data.people.map(name => Person.create({name}))
        // data.places.map(place => Place.create(place)),
        // data.things.map(thing => Thing.create(thing))
    );
};



module.exports = {
    syncAndSeed,
    models: {
        Person,
        Place,
        Thing,
        Souvenir
    }
};

