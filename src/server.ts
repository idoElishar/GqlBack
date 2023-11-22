import express from "express";
import cors from "./middleware/morgen/cors/cors";
import morgan from "./middleware/morgen/morgen";
import usersRoute from './users/routes.users';
import productRoute from './Banners/Banners.Routes';
// import mongoose from 'mongoose';
import { connectToDatabase } from "./connectToDB";
const app = express();

connectToDatabase();

app.use(express.json({limit: '50mb'}));

app.use(cors)
app.use(morgan)



const PORT = 8008;
app.listen(PORT, () => console.log(`server run in port ${PORT}!`));

app.use('/api/banners', productRoute);
app.use('/api/users', usersRoute);

