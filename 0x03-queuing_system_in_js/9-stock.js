import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();
const client = redis.createClient();

const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to get an item by its ID from the listProducts array
function getItemById(id) {
  return listProducts.find((item) => item.id === id);
}

// Function to reserve stock for an item in Redis
function reserveStockById(itemId, stock) {
  const setAsync = promisify(client.set).bind(client);
  return setAsync(`item.${itemId}`, stock);
}

// Function to get the current reserved stock for an item from Redis
async function getCurrentReservedStockById(itemId) {
  const getAsync = promisify(client.get).bind(client);
  const reservedStock = await getAsync(`item.${itemId}`);
  return reservedStock ? parseInt(reservedStock) : 0;
}

// Route to get the list of available products
app.get('/list_products', (req, res) => {
  res.json(
    listProducts.map((item) => ({
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      initialAvailableQuantity: item.stock
    }))
  );
});

// Route to get the product details and current available stock
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = getItemById(itemId);

  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  const currentQuantity = item.stock - await getCurrentReservedStockById(itemId);

  res.json({
    itemId: item.id,
    itemName: item.name,
    price: item.price,
    initialAvailableQuantity: item.stock,
    currentQuantity: currentQuantity
  });
});

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const item = getItemById(itemId);

  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  const currentReservedStock = await getCurrentReservedStockById(itemId);
  if (currentReservedStock >= item.stock) {
    res.json({ status: 'Not enough stock available', itemId: item.id });
    return;
  }

  await reserveStockById(itemId, currentReservedStock + 1);
  res.json({ status: 'Reservation confirmed', itemId: item.id });
});

// Start the server
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});
