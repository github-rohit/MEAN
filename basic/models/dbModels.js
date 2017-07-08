var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var dbSchema = new Schema({
    title: { type : String , required : true, dropDups: true },
    desc: String,
    duration: String,
    contentRating: String,
    genre: String,
    release_year: String,
    release_date: { type: String },
    poster: String,
    rating: Number,
    language: String,
    producer: String,
    director: String,
    writers: String,
    stars: String
});
    
var Series = mongoose.model('Series', dbSchema);
    Series.collection.ensureIndex( { "title": 1, "release_year": 1 }, { unique: true } )

module.exports = Series;