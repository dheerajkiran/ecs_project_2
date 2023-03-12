const express = require('express');
const { getItemModel } = require('./cart');

const app = express();

app.get("/items", async(req, res)=>{
    let itemId = req.query.itemId;
    let itemModel = await getItemModel();
    const item = new itemModel({id: itemId});
    let doc = await itemModel.findOneAndUpdate({id:itemId}, {id: itemId});

    //logic to check existence of item in store


    //check existence in cart
    if(!doc){
        //tenant not found so making a new tenant
        try {
            await item.save();
          } catch (err) {
            // handle error
          }

    }
    res.send(JSON.stringify(item));
})

app.get('/', (req, res) => {
    res.send('<h1>Node Application</h1>');
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});