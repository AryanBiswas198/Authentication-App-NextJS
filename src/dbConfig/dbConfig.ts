import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("DB Connected Successfully");
        });

        connection.on('error', (err) => {
            console.log("MongoDB Connection Error !! Please Make Sure DB is up and running." + err);
        })
    } catch(err: any){
        console.log("Something went wrong while connecting to database !!");
        console.error(err);
    }
}