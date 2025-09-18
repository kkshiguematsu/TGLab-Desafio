const express = require("express");
const { faker } = require("@faker-js/faker");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const http = require("http");
const { WebSocketServer } = require("ws");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const players = [];

app.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const id = faker.string.uuid();

  if (players.find((player) => player.email === email))
    return res.status(400).json({ message: "Email já cadastrado" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Senhas não conferem" });

  players.push({
    id,
    name,
    email,
    password,
    confirmPassword,
    balance: 1000,
    currency: "BRL",
    accessToken: null,
    bets: [],
    transactions: [],
  });

  res.json({
    id,
    name,
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const player = players.find(
    (player) => player.email === email && player.password === password
  );

  if (!player)
    return res.status(400).json({ message: "Email ou senha inválidos" });

  const accessToken = faker.string.uuid();

  player.accessToken = accessToken;

  res.json({
    id: player.id,
    name: player.name,
    balance: player.balance,
    currency: player.currency,
    accessToken,
  });
});

app.post("/bet", (req, res) => {
  const { amount } = req.body;
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ message: "Token inválido" });

  const player = players.find(
    (player) => player.accessToken === authorization.replace("Bearer ", "")
  );

  if (!player) return res.status(401).json({ message: "Token inválido" });

  if (player.balance < amount)
    return res.status(400).json({ message: "Saldo insuficiente" });

  if (amount < 1)
    return res.status(400).json({ message: "Valor mínimo para aposta é 1" });

  const isWin = Math.random() < 0.3;
  const betTransactionId = faker.string.uuid();

  player.balance = player.balance - amount;

  if (isWin) player.balance = player.balance + amount * 2;

  sendBalanceUpdate(player.accessToken, player.balance);

  player.transactions.push({
    id: betTransactionId,
    amount,
    type: "bet",
    createdAt: new Date(),
  });

  if (isWin)
    player.transactions.push({
      id: faker.string.uuid(),
      amount: amount * 2,
      type: "win",
      createdAt: new Date(),
    });

  player.bets.push({
    id: betTransactionId,
    amount,
    status: isWin ? "win" : "lost",
    createdAt: new Date(),
    winAmount: isWin ? amount * 2 : null,
  });

  res.json({
    transactionId: betTransactionId,
    currency: "BRL",
    balance: player.balance,
    winAmount: isWin ? amount * 2 : null,
  });
});

app.get("/my-bets", (req, res) => {
  const { id, status, page, limit } = req.query;
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ message: "Token inválido" });

  if (!page || !limit)
    return res.status(400).json({ message: "Parâmetros inválidos" });

  const player = players.find(
    (player) => player.accessToken === authorization.replace("Bearer ", "")
  );

  if (!player) return res.status(401).json({ message: "Token inválido" });

  const bets = player.bets
    .filter(
      (bet) =>
        (!id || bet.id === id) && (!status || bet.status === status) && bet
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  const total = bets.length;
  const data = bets.slice((page - 1) * limit, page * limit);

  res.json({
    data,
    total,
    page: Number(page),
    limit: Number(limit),
  });
});

app.delete("/my-bet/:id", (req, res) => {
  const { id } = req.params;
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ message: "Token inválido" });

  const player = players.find(
    (player) => player.accessToken === authorization.replace("Bearer ", "")
  );

  if (!player) return res.status(401).json({ message: "Token inválido" });

  const bet = player.bets.find((bet) => bet.id === id);

  if (!bet) return res.status(404).json({ message: "Aposta não encontrada" });

  if (bet.status === "canceled")
    return res.status(400).json({ message: "Aposta já cancelada" });

  if (bet.status === "win" && player.balance < bet.amount)
    return res.status(400).json({ message: "Aposta já finalizada" });

  player.balance += bet.amount;
  sendBalanceUpdate(player.accessToken, player.balance);

  bet.status = "canceled";

  player.transactions.push({
    id: faker.string.uuid(),
    amount: bet.amount,
    type: "cancel",
    createdAt: new Date(),
  });

  res.json({
    transactionId: id,
    balance: player.balance,
    currency: player.currency,
  });
});

app.get("/my-transactions", (req, res) => {
  const { id, type, page, limit } = req.query;
  const authorization = req.headers.authorization;

  if (!authorization)
    return res.status(401).json({ message: "Token inválido" });

  if (!page || !limit)
    return res.status(400).json({ message: "Parâmetros inválidos" });

  const player = players.find(
    (player) => player.accessToken === authorization.replace("Bearer ", "")
  );

  if (!player) return res.status(401).json({ message: "Token inválido" });

  const transactions = player.transactions
    .filter(
      (transaction) =>
        (!id || transaction.id === id) &&
        (!type || transaction.type === type) &&
        transaction
    )
    .sort((a, b) => b.createdAt - a.createdAt);

  const total = transactions.length;
  const data = transactions.slice((page - 1) * limit, page * limit);

  res.json({
    data,
    total,
    page: Number(page),
    limit: Number(limit),
  });
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJsdoc({
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "Wallet Mock API",
          version: "1.0.0",
        },
      },
      apis: ["api.js"],
    })
  )
);

// =============== WebSocket ===============
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const webSocketClients = [];

wss.on("connection", (ws) => {
  console.log("Cliente conectado via WebSocket.");
  let clientId = null;

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "auth" && data.token) {
        const player = players.find((p) => p.accessToken === data.token);

        if (player) {
          webSocketClients.push({ id: player.accessToken, ws: ws });
          sendBalanceUpdate(player.accessToken, player.balance);

          console.log(`Jogador ${clientId} autenticado no WebSocket.`);
        } else {
          ws.close();
        }
      }
    } catch (e) {
      console.error("Erro ao processar mensagem WebSocket:", e);
    }
  });

  ws.on("close", () => {
    if (clientId) {
      webSocketClients = webSocketClients.filter(
        (client) => client.id !== clientId
      );
      console.log(`Jogador ${clientId} desconectado.`);
    }
  });
});

const WEBSOCKET_PORT = 9999;

server.listen(WEBSOCKET_PORT, () =>
  console.log(
    `Servidor HTTP e WebSocket rodando em http://localhost:${WEBSOCKET_PORT}! ✨👋🌎`
  )
);

function sendBalanceUpdate(playerId, newBalance) {
  const client = webSocketClients.find((c) => c.id == playerId);
  if (client && client.ws.readyState === client.ws.OPEN) {
    const message = {
      type: "balance_update",
      payload: { balance: newBalance },
    };

    console.log(message);

    client.ws.send(JSON.stringify(message));
  }
}

app.listen(port, () =>
  console.log(`Listening: http://localhost:${port}! ✨👋🌎`)
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *   schemas:
 *     RegisterPlayerDto:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *     RegisterPlayerResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *     LoginDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     LoginResponseDto:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         balance:
 *           type: integer
 *         currency:
 *           type: string
 *         accessToken:
 *           type: string
 *     BetDto:
 *       type: object
 *       required:
 *         - amount
 *       properties:
 *         amount:
 *           type: number
 *           description: Valor apostado
 *     BetResponseDto:
 *       type: object
 *       properties:
 *         transactionId:
 *           type: string
 *         currency:
 *           type: string
 *         balance:
 *           type: number
 *         winAmount:
 *           type: number
 *     MyBetsResponseDto:
 *        type: object
 *        properties:
 *         id:
 *           type: string
 *         createdAt:
 *           type: string
 *         amount:
 *           type: number
 *         winAmount:
 *           type: number
 *         status:
 *           type: number
 *     MyTransactionResponseDto:
 *        type: object
 *        properties:
 *         id:
 *           type: string
 *         createdAt:
 *           type: string
 *         amount:
 *           type: number
 *         type:
 *           type: number
 *     PaginateTransactionResponseDto:
 *        type: object
 *        properties:
 *         data:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/MyTransactionResponseDto'
 *         total:
 *           type: number
 *         page:
 *           type: number
 *         limit:
 *           type: number
 *     PaginateResponseDto:
 *        type: object
 *        properties:
 *         data:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/MyBetsResponseDto'
 *         total:
 *           type: number
 *         page:
 *           type: number
 *         limit:
 *           type: number
 *     CancelBetResponseDto:
 *        type: object
 *        properties:
 *         transactionId:
 *           type: string
 *         balance:
 *          type: number
 *         currency:
 *          type: string
 *
 * /register:
 *   post:
 *     summary: Cria um novo jogador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterPlayerDto'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterPlayerResponseDto'
 * /login:
 *   post:
 *     summary: Realiza o login do jogador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseDto'
 *
 * /bet:
 *   post:
 *     summary: Realiza uma aposta
 *     tags: [Bet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BetDto'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BetResponseDto'
 * /my-bet/{id}:
 *   delete:
 *     summary: Cancela uma aposta
 *     tags: [Bet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          required: true
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CancelBetResponseDto'
 * /my-bets:
 *   get:
 *     summary: Consulta as apostas do jogador
 *     tags: [Bet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: false
 *      - in: query
 *        name: status
 *        schema:
 *          type: string
 *        required: false
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: true
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: true
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/PaginateResponseDto'
 *
 * /my-transactions:
 *   get:
 *     summary: Consulta as transações do jogador
 *     tags: [Wallet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: string
 *        required: false
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *        required: false
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        required: true
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required: true
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/PaginateTransactionResponseDto'
 *
 */
