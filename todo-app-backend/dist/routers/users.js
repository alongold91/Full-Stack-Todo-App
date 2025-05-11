"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const usersSchema_1 = require("../middleware/shcemas/usersSchema");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = (0, express_1.Router)();
router.post('/create', (0, validationMiddleware_1.validateData)(usersSchema_1.createUserSchema), users_1.createUser);
router.post('/login', (0, validationMiddleware_1.validateData)(usersSchema_1.loginUserSchema), users_1.loginUser);
// router.post(
//   '/create-user-and-todo-sequential-transaction',
//   createUserAndTodoAsSequentialTransaction
// );
// router.post(
//   '/create-user-and-todo-interactive-transaction',
//   createUserAndTodoAsInteractiveTransaction
// );
exports.default = router;
//# sourceMappingURL=users.js.map