import cors from 'cors';
import express from 'express';
import { config, stripeReady } from './config';
import paymentRoutes from './routes/payments';
import subscriptionRoutes from './routes/subscription';

const app = express();

app.use(
  cors({
    origin: config.allowedOrigins,
    credentials: true,
  })
);

app.use(
  express.json({
    verify: (req, _res, buffer) => {
      (req as express.Request & { rawBody?: Buffer }).rawBody = buffer;
    },
  })
);
app.use('/api', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    stripeReady,
    time: new Date().toISOString(),
  });
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${config.port}`);
  // eslint-disable-next-line no-console
  console.log(`Stripe routes ${stripeReady ? 'enabled' : 'disabled until Stripe env vars are set'}`);
});
