import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    // const db1 = db.useDb("Anime");
    // console.log(db1);
    console.log("connect DB");
  } catch (error) {
    console.error(error);
    process.emit(1);
  }
};
export default connectDB;
