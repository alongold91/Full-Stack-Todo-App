"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routers/todos"));
const users_1 = __importDefault(require("./routers/users"));
const app = (0, express_1.default)();
const PORT = 3000;
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'], // Allow both
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Add this for session cookies to work cross-origin
}));
// Parse JSON request bodies
app.use(express_1.default.json());
// Route prefix
app.use('/api/users', users_1.default);
app.use('/api/todos', todos_1.default);
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
//# sourceMappingURL=index.js.map