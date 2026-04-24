import express from 'express';
import {PORT, NODE_ENV} from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectDB from './database/mongodb.js';
import errorHandler from './middlewares/error.handler.js';
import cookiesParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiesParser());
app.use(arcjetMiddleware);

app.use('/api/v1/users',userRouter);
app.use('/api/v1/auths',authRouter);
app.use('/api/v1/subscriptions',subscriptionRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} mode.`);
});

export default app;