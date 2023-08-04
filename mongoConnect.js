const mongoose = require("mongoose");

function mongoConnect() {
    mongoose.connect('mongodb+srv://pd664:Abc1%40Xyz2@cluster0.lnbqz78.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

    .then(() => {console.log(`connection successfull`);})
    
    .catch((err) => console.log(err));
}

module.exports.mongoConnect = mongoConnect