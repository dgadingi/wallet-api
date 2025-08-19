import express from 'express';
import dotenv from 'dotenv';
import { initDB } from "./config/db.js";
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from "./routes/transactionsRoute.js";
dotenv.config();
import job from "./config/cron.js";

const app = express();

if (process.env.NODE_ENV === 'production') job.start();

// middleware
app.use(rateLimiter);
app.use(express.json());

const port = process.env.PORT || 5001;

app.use('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/api/transactions', transactionsRoute);

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is up and listening on port ${port}`);
    })
});