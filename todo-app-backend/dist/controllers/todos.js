"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodosByUserId = getTodosByUserId;
exports.updateUserTodo = updateUserTodo;
exports.deleteUserTodo = deleteUserTodo;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const DUMMY_USER_ID = 46;
const prisma = new client_1.PrismaClient();
function getTodosByUserId(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield prisma.todo.findMany({
                where: { userId: DUMMY_USER_ID },
                include: {
                    user: {
                        select: {
                            firstName: true
                        }
                    }
                }
            });
            response.status(http_status_codes_1.StatusCodes.OK).json(todos);
        }
        catch (error) {
            response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Failed to get the todos'
            });
        }
    });
}
function updateUserTodo(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const test = yield prisma.todo.update({
                where: { id: request.body.todoId, userId: DUMMY_USER_ID },
                data: { content: request.body.newContent }
            });
            response
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: `Todo ${request.body.todoId} is updated successfully` });
        }
        catch (error) {
            response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Failed to update the todo'
            });
        }
    });
}
function deleteUserTodo(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const test = yield prisma.todo.delete({
                where: { id: request.body.todoId }
            });
            response
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: `Todo ${request.body.todoId} is deleted successfully` });
        }
        catch (error) {
            response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Failed to delete the todo'
            });
        }
    });
}
//# sourceMappingURL=todos.js.map