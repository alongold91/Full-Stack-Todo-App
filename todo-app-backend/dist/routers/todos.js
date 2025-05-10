"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = (0, express_1.Router)();
router.get('/get-user-todos', todos_1.getTodosByUserId);
router.patch('/update', todos_1.updateUserTodo);
router.delete('/delete', todos_1.deleteUserTodo);
exports.default = router;
//# sourceMappingURL=todos.js.map