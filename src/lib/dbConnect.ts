import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect (){
    // Check if we have a connection to the database or if it's currently connecting
    if (connection.isConnected) {
        console.log("Already Connected")
        return;
    }

    try {
        // Attempt to connect to the database
        const db = await mongoose.connect(process.env.MONGO_DB_URI || "", {})
        console.log(db);
        connection.isConnected = db.connections[0].readyState
        
    } catch (error) {
        
        console.log("Database Connection Failed: ", error);

         // Graceful exit in case of a connection error
        process.exit(1)
    }
}

export default dbConnect