var Series = require('../models/dbModels');
var bodyParser = require('body-parser');

module.exports =  function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));

    app.get('/', function(req, res){
        res.render('index');
    }); 

    app.get('/api/series/', function(req, res){
        var queryParams = JSON.parse(req.query.query);
        var queryObj = {};
        var queryKey = queryParams.searchKey || 'title';

        queryObj[queryKey] = {$regex : ".*" + queryParams.query +".*", '$options' : 'i'};

        Series.find(queryObj, function(err, series) {
            var returnObj = {};

            if(err) {
                returnObj = {
                    message: 'error',
                    error: true
                };
            } else if(!series.length) {
                returnObj = {
                    message: 'No record found.',
                    norecord: true
                };
            } else {
                returnObj = {
                    lists: series
                };
            }

            res.send(returnObj);
        })
    }); 

    app.post('/api/save', function(req, res){
        Series.create(req.body, function(err, msg){
            var returnObj = {};
            if(err) {
                returnObj = {
                    code: err.code,
                    error: true
                }
            } else {
                returnObj = {
                    message: '',
                    success: true
                }
            }

            res.send(returnObj);
        });
    });

    app.post('/api/update', function(req, res){
        Series.findByIdAndUpdate(req.body._id, req.body, function(err, msg){
            var returnObj = {};
            if(err) {
                returnObj = {
                    code: err.code,
                    error: true
                }
            } else {
                returnObj = {
                    message: '',
                    success: true
                }
            }

            res.send(returnObj);
        });
    }); 

    app.delete('/api/delete', function(req, res){
        Series.findByIdAndRemove(req.query._id, function(err, msg){
            var returnObj = {};

            if(err) {
                returnObj = {
                    code: err.code,
                    error: true
                }
            } else {
                returnObj = {
                    message: '',
                    success: true
                }
            }

            res.send(returnObj);
        });
    });         
}