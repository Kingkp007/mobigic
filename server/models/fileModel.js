const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    docName: {
        type:String,
        required:[true, 'Document name is required']
    },
    userId: {
        type:String,
        required:[true, 'userId name is required']
    },
    pin: {
        type:Number,
        required:[true, 'pin name is required']
    },
    })


const fileModel = mongoose.model('files', fileSchema)

module.exports = fileModel