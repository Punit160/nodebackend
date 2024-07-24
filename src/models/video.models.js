import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = mongoose.schema({
     videoFile : {
        type : String,
        required : true
     },
     thumbnail : {
        type : String,
        required : true
     },
     title : {
        type : String,
        required : true
     },
     descriptio : {
        type : String,
        required : true
     },
     title : {
        type : String,
        required : true
     },
     duration : {
        type : Number,
        required : true
     },
     views : {
        type : Number,
        required : true
     },
     isPublished : {
        type : Boolean,
        required : true
     },
     owner : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
     }        

}, {timeStamps : true})

videoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model('Video', videoSchema)