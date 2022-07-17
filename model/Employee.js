const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

//by default, when mongoose creates this data model, name will be employees
//lowercase and plural, so employees needs to be name of db on Mongo.
module.exports = mongoose.model("Employee", employeeSchema);
