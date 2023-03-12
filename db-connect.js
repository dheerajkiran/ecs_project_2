const mongoose = require('mongoose');


const mdOptions = {
    // userNewUrlParse:true,
    // userUnifiedTopology:true,
    autoIndex:true,
    // connecTimeOutMS:10000,
    socketTimeOutMS:30000,
};

const clientOption = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  };

const connect = async(url, options) =>{

    return new Promise(async (resolve, reject) =>{
        const connection = await mongoose.createConnection(url, clientOption).asPromise();
        resolve(connection);
    });
}


module.exports = {
    connect,
}