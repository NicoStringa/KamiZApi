import mongoose from "mongoose";

export const dbConnection =async () :Promise<void> => {
    try {
        const dbURL = process.env.DB_URL;
        if(!dbURL){
            throw new Error("The URL is not correct in .env")
        }

        await mongoose.connect(dbURL)
        console.log("Database online")
    } catch (error) {
        console.log(error)
        throw new Error("Error initialazing the database")
    }
}