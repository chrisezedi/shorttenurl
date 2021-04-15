const mongoose = require("mongoose");
const Crypto = require("crypto");

//shorten url
const shortenUrl = function(size = 6) { 
    return Crypto
    .randomBytes(size)
    .toString('hex')
    .slice(0, size)
}

//url validator
function validateUrl(url){
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    return regexp.test(url) ? true : false;
}

//schema
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    full:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(url){
                return validateUrl(url);
            },
            message: props => `${props.value} is not a valid url`
        }
    },
    short:{
        type:String,
        required:true
    }
});

//model
const Url = mongoose.model('Url',urlSchema);
module.exports = Url;

//getUrls
module.exports.getUrls = async function () {
    const urls = await this.find({});
    return urls;
}

//add url
module.exports.addUrl = async function (fullurl) {
    const urlExist = await this.findOne({full:fullurl});
    if (urlExist) {
        throw new Error(`${fullurl} has already been shortened`);
    }

    const url = new Url({
        full:fullurl,
        short:`${process.env.BASE_DEV_URL}${shortenUrl()}`
    });
    
    await url.save();
    return url;
}