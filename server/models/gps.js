var mongoose = require('mongoose');

var gps = mongoose.model('gps',{
  username:{
    type: String,
        required: true,
        minlength: 1,
        trim: true
  },
  completed: {
        type: Boolean,
        default: false

    },
  latitude:{
    type:Number,
    required:true,
  },
  longitude:{
    type:Number,
    required:true,
  },
  time:{
    type:Date,
    required:true
  }
});

module.exports = {gps};
