const mongoose = require ('mongoose');

const dataschema = mongoose.Schema({


pseudo:{
    type: String,
    required: true,
},

adressemail:{
    type: String,
    required: true,
},

motdepasse:{
    type: String,
    required: true,

}

},
{
    timestamps: true
}

)

const Datauser = mongoose.model('Datauser' , dataschema )
module.exports = Datauser;