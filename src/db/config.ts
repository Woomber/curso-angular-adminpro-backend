import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.dbconn || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("BD online");
  } catch (error) {
    console.error(error);
  }
};
