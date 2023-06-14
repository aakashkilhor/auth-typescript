import mongoose from "mongoose";
const MONGODB_URL: string = process.env.MONGODB_URL || "";
mongoose.set("strictQuery", true);

const connect = () => {
  mongoose.connect(MONGODB_URL);
  try {
    console.log("DB connected");
  } catch (error) {
    console.log("Error in DB connection");
    console.log(error);
    process.exit(1);
  }
};
export default connect;