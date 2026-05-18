const ordersContainer = document.getElementById('orders-container');
const addOrderButton = document.getElementById('add-order-button');
const emptyMessage = document.getElementById('empty-message');

let nextOrderId = 1;
const orders = [];

function receiveNewOrder() {
  const newOrder = {
    id: nextOrderId++,
    status: 'En Proceso',
    createdAt: new Date(),
  };

  orders.push(newOrder);
  renderOrders();
  return newOrder;
}

function updateOrderVisualStatus(orderId, newStatus) {
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;

  order.status = newStatus;
  const orderElement = document.getElementById(`order-${orderId}`);
  if (orderElement) {
    const statusElement = orderElement.querySelector('.status');
    statusElement.textContent = order.status;
    statusElement.className = `status ${newStatus === 'Completado' ? 'completado' : 'proceso'}`;
  }
}

function renderOrders() {
  ordersContainer.innerHTML = '';

  if (orders.length === 0) {
    emptyMessage.style.display = 'block';
    return;
  }

  emptyMessage.style.display = 'none';

  orders.forEach((order) => {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.id = `order-${order.id}`;

    card.innerHTML = `
      <span>Pedido #${order.id}</span>
      <span class="status ${order.status === 'Completado' ? 'completado' : 'proceso'}">${order.status}</span>
    `;

    ordersContainer.appendChild(card);
  });
}

function simulatePreparation(order) {
  return new Promise((resolve) => {
    const preparationTime = 2000 + Math.random() * 3000;

    setTimeout(() => {
      resolve(order.id);
    }, preparationTime);
  });
}

async function processOrder(order) {
  try {
    const orderId = await simulatePreparation(order);
    updateOrderVisualStatus(orderId, 'Completado');
  } catch (error) {
    updateOrderVisualStatus(order.id, 'Error');
    console.error('Error en la preparación del pedido:', error);
  }
}

addOrderButton.addEventListener('click', () => {
  const order = receiveNewOrder();
  updateOrderVisualStatus(order.id, order.status);
  processOrder(order);
});

renderOrders();
