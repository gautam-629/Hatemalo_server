import 'reflect-metadata';
import express, {NextFunction, Request, Response } from 'express';
import routes from './http/routes/routes';
import ErrorHandler from './http/middleware/errorHandler';

const app = express();

// Middleware for JSON parsing
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Register all Router
routes(app);
// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler.errorHandler(err, req, res, next);
});

// Export the app
export default app;
