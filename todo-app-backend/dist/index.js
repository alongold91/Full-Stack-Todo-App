"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./routers/users"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const PORT = 3000;
// Enable CORS for all routes
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((0, express_session_1.default)({
    secret: 'test',
    saveUninitialized: false,
    resave: false
}));
// Parse JSON request bodies
app.use(express_1.default.json());
// Route prefix
app.use('/api/users', users_1.default);
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
//# sourceMappingURL=index.js.map