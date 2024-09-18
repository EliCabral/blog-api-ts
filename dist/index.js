"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./db/database");
const posts_1 = __importDefault(require("./domain/posts/routes/posts"));
const comments_1 = __importDefault(require("./domain/comments/routes/comments"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware para tratar JSON
app.use(express_1.default.json());
// Iniciar o banco de dados e criar tabelas
(0, database_1.createTables)();
// Rotas
app.use('/posts', posts_1.default);
app.use('/posts/:id/comments', comments_1.default);
// Iniciando o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
