const express = require('express');
const cors = require('cors');
const pool = require('./db');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({ status: 'unhealthy', error: err.message });
  }
});

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

app.listen(PORT, () => {
  console.log(`ShopEasy backend listening on port ${PORT}`);
});