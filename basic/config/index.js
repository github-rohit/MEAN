var config = require('./config');

module.exports = {
    getDbConnectionString: function(){
        return 'mongodb://' + config.uname + ':' + config.pwd + 'you mlab key';
    }
}