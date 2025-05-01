"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const usersSchema_1 = require("../middleware/shcemas/usersSchema");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = (0, express_1.Router)();
router.post('/create', (0, validationMiddleware_1.validateData)(usersSchema_1.createUserSchema), users_1.createUser);
exports.default = router;
