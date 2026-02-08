import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './lib/env.js';
import { prisma } from './lib/prisma.js';
import { errorMiddleware } from './middleware/error/index.js';

const app = express();
const PORT = Number(env.PORT) || 3000;

// Middleware
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'", // Required for Swagger UI scripts
          'https://we-care-backend-tiyp.onrender.com', // Allow scripts from your backend
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Required for Swagger UI styles
        ],
        connectSrc: [
          "'self'",
          'https://we-care-backend-tiyp.onrender.com', // Allow API calls to your backend
        ],
        imgSrc: ["'self'", 'data:'], // Allow images (Swagger UI may use data URLs)
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [], // Ensure HTTPS is enforced
      },
    },
  })
);
// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://we-care-backend-tiyp.onrender.com',
    ],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  })
);
// Body parsers and cookie parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
// Trust proxy for rate limiting
app.set('trust proxy', 1);

// API Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    status: 429,
    message: 'Too many requests. Please try again later.',
  },
});

// Apply the rate limiter to all requests
app.use(limiter);
app.use(errorMiddleware);

// Routes
app.get('/', async (req, res) => {
  const data = await prisma.doctor.findMany();
  res.json({ message: 'Hello World!', data: data });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on port http://localhost:${PORT}`);
});
