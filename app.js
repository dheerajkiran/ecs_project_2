const express = require('express');
const { getItemModel } = require('./item');
const { getUserModel } = require('./user');

const app = express();

app.get("/items", async(req, res)=>{
    let itemId = req.query.itemId;
    let name = req.query.name;
    let cost = req.query.cost;
    let itemModel = await getItemModel();
    const item = new itemModel({id: itemId, name:name, cost:cost});
    let doc = await itemModel.find({id:itemId});

    //logic to check existence of item in store


    //check existence in cart
    if(doc.length==0){
        //tenant not found so making a new tenant
        try {
            await item.save();
          } catch (err) {
            // handle error
          }
        res.send(JSON.stringify(item));
    }
    else{
        res.send(JSON.stringify(doc));
    }
    
})

app.get("/auth", async(req, res)=>{
    let userId = req.query.uid;
    let name = req.query.name;
    let passHash = req.query.pass;
    let userModel = await getUserModel();

    const user = new userModel({id: userId, name:name, pass:passHash});
    let doc = await userModel.find({id:userId});

    //logic to check existence of item in store


    //check existence in cart
    if(doc.length==0){
        //user not found
        try {

            
            await user.save();
          } catch (err) {
            // handle error
          }
        res.send(JSON.stringify(user));
    }
    else{
        pass = doc[0].pass;
        if(pass === passHash){
            res.send(JSON.stringify(doc[0].cart))
        }
        else{
            res.send("fail")
        }
    }
    
})

app.get("/authcard", async(req, res)=>{
    let userId = req.query.uid;
    let userModel = await getUserModel();

    let doc = await userModel.find({id:userId});

    //logic to check existence of item in store


    //check existence in cart
    // if(doc.length==0){
    //     res.send(doc);
    // }
    // else{
        
    // }
    res.send(doc) 
    
})
app.get("/cart", async(req, res)=>{
    let userId = req.query.uid;
    let itemId = req.query.itemId;

    let userModel = await getUserModel();
    let itemModel = await getItemModel();

    let doc_user = await userModel.find({id:userId});
    let doc_item = await itemModel.find({id:itemId});

    //logic to check existence of item in store


    //check existence 
    if(doc_user.length==0){
        res.send("User doesn't exist");
    }
    else if(doc_item.length==0){

        res.send("Item DOesn't exist doesn't exist");
    }
    else{
        // try{
            let doc = await userModel.findOneAndUpdate({id:userId}, {$push: {cart:doc_item[0]}});
            res.send("Successfully added item");
        // }catch (err) {
        //     res.send("fail");
        //   }
        
    }
    
})

app.get('/', (req, res) => {
    res.send('<h1>Node Application</h1>');
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});
