const mongoose = require("mongoose");

const uri =
  "mongodb+srv://harshild:L6yKkaOL5cJG1Ra5@gofoodcluster.croeweu.mongodb.net/GoFood?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const fetch_data = await mongoose.connection.db.collection("food_items");

    const result = await fetch_data.find({}).toArray();

    global.food_items = result;

    const foodCategory = await mongoose.connection.db.collection(
      "food_category"
    );

    const categorees = await foodCategory.find({}).toArray();

    global.food_category = categorees;

    //
  } catch (error) {
    process.exit(1);
  }
};

module.exports = connectDB;
