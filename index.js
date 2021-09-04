const mongoose = require('mongoose') // importing mongoose module

require('dotenv').config({ path: './.env'}) // importing dotenv module

// connecting to the database created ny Mongo Compass
mongoose
    .connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
    .then(()=> console.log("database connected...")) 
    .catch((err)=>console.error(err))


// Creating a Person SCHEMA
const PersonPro = mongoose.Schema({
    id: {type:Number, unique:true},
    name: {type:String, required:true},
    age: {type:Number, default:18},
    favoriteFoods: [String],
})

//Creating the model 
const Person = mongoose.model("Person", PersonPro)

// Creating a record of a model
var firstPerson = new Person({
    id: 1,
    name: 'Abdelhak',
    age: 27,
    favoriteFoods: ['meglii', 'rouz jerbi']
})

// Saving a record of a Model 
firstPerson.save((err) => {if (err) throw err
    console.log('the first Person added successfully :) ')
}
)

// Initializing records 
let Persons = [
    {id:2, name: 'Sabyouch', age: 23, favoriteFoods: ['kosksii', 'chappati', 'ma9rouna fell n°2']},
    {id:3, name: 'Firas', age: 24, favoriteFoods: ['rouz', 'mlou5iya', 'djaaj']},
    {id:4, name: 'Youssef', age: 27, favoriteFoods: ['lablaabi', 'loubya', '3dass']},
    {id:5, name: 'Oussema', age: 28, favoriteFoods: ['yer7ii koll  mee ifallet chay']},
]

// Creating records with model.create
Person.create(Persons)
      .then((persons) => {console.log('success', persons)} )
      .catch((err) => {console.log(err)} )

// Finding all the people having the name Sabyouch
Person.find({ name: 'Sabyouch'}, function (err, res) {
    if (err) throw err
    console.log(res)
})

// Finding a Single Person which has a certain food 
let food = 'lablaabii'
Person.findOne({ favoriteFoods: food}, function(err, res) {
    if (err) throw err
    console.log(res)
})

// Finding a Person by ID
let personId = 2
Person.findById( personId, function(err, res) {
    if (err) throw err
    console.log(res)
})

// Classic Updates
Person.findById( personId)
      .then((p) => {
          p.favoriteFoods.push('Hamburger')
          p.save()
})

// Performing new updates
let personName = 'Sabyouch'
Person.findOneAndUpdate(
    {name: personName},
    {$set: {age: 20}},
    {new: true}
)

// Deleting on person
Person.findByIdAndRemove(personId)

// Deleting many documents
let person_name = 'Mary'
Person.remove({name: person_name}, function (err, res){
    if (err) throw err
    console.log(res)
})

// Chain Search Query Helpers to Narrow Search Results
const ChainSearch = function (done) {
let foodName = 'burritos'
Person.find({favoriteFoods: foodName})
      .sort({name: 1})
      .limit(2)
      .select(-age)
      .exec((err, data) => {
          if(err) done(err)
          done(null, data)
      })
}
