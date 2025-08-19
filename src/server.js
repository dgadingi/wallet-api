import express from 'express';
import dotenv from 'dotenv';
import { initDB } from "./config/db.js";
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from "./routes/transactionsRoute.js";
dotenv.config();

const app = express();

// middleware
app.use(rateLimiter);
app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/transactions', transactionsRoute);

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is up and listening on port ${port}`);
    })
});