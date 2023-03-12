const {connect} = require('./db-connect');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://PriyanshuYakub:ecs12345@cluster0.b5w4zmj.mongodb.net/ecs_project_test1?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true };



// const url = "mongodb://0.0.0.0:27017/ecs_project_test1";


let db;

const itemSchema = new mongoose.Schema({
    id: String,
    name: String,

}, {timestamps:true});


const itemModel = mongoose.model("items", itemSchema);


const getDb = async() => {
// return db ? db:await connect(url);
return db ? db:await connect(uri, options)


};

const getItemModel = async() => {
    const adminDb = await getDb();

    return adminDb.model("items", itemSchema);
};

module.exports = {
    getItemModel,
}