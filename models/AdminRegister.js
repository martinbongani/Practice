const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema ({
    email: {
        type:String,
        trim:true
    },
    // password: {
    //     type:String,
    //     trim:true
    // },
    role: {
        type:String,
        trim:true
    }
});

adminSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});
module.exports = mongoose.model('AdminRegister', adminSchema);