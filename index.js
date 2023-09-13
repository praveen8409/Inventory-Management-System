const express = require('express');
const server = express();

server.get('/', (req,res) => {
    return res.send("Welcome to Inventory App");
});

server.listen(3100, ()=>{
    console.log('Server is running on port : 3100');
})