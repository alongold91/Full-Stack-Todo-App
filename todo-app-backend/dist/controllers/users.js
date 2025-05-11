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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
function createUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body: { firstName, lastName, email, password } } = request;
            const salt = yield bcrypt_1.default.genSalt();
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            yield prisma.user.create({
                data: { firstName, lastName, email, password: hashedPassword }
            });
            response
                .status(http_status_codes_1.StatusCodes.CREATED)
                .json({ message: 'User created successfully' });
            /*If we catch an unknown error that is not related to validation */
        }
        catch (error) {
            console.error('Error creating user:', error);
            response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Failed to create user'
            });
        }
    });
}
function loginUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loggedInUser = yield prisma.user.findUnique({
                where: { email: request.body.email }
            });
            if (loggedInUser) {
                response.status(http_status_codes_1.StatusCodes.OK).json({
                    id: loggedInUser.id
                });
            }
            else
                response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                    error: 'The user was not found'
                });
        }
        catch (error) {
            response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Unexpected error'
            });
        }
    });
}
// export async function createUserAndTodoAsSequentialTransaction(
//   request: Request,
//   response: Response
// ) {
//   try {
//     const [user, todo] = await prisma.$transaction([
//       prisma.user.create({
//         data: {
//           firstName: 'Julian',
//           lastName: 'The clown',
//           email: 'JulCr@gmail.com',
//           password: 'Hello easy password'
//         }
//       }),
//       prisma.todo.create({
//         data: {
//           header: 'Julians welcome todo',
//           content: 'Hello julians first todo content',
//           isDone: false,
//           userId: 59
//         }
//       })
//     ]);
//     console.log(user);
//     console.log(todo);
//     response.status(StatusCodes.OK).json({
//       ...user,
//       ...todo
//     });
//   } catch (error) {
//     response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: 'Unexpected error with transaction'
//     });
//   }
// }
// export async function createUserAndTodoAsInteractiveTransaction(
//   request: Request,
//   response: Response
// ) {
//   try {
//     const result = await prisma.$transaction(
//       async (tx) => {
//         const newUser = await tx.user.create({
//           data: {
//             firstName: 'Harold',
//             lastName: 'Roblust',
//             email: `JulCr_${Date.now()}@gmail.com`,
//             password: 'Hello easy password'
//           }
//         });
//         const newTodo = await tx.todo.create({
//           data: {
//             header: `${newUser.firstName} first post`,
//             content: `${newUser.firstName} ${newUser.lastName}'s first todo `,
//             isDone: false,
//             userId: newUser.id
//           }
//         });
//         return { user: newUser, todo: newTodo };
//       },
//       {
//         // Increase timeout to 15 seconds
//         timeout: 15000,
//       }
//     );
//     console.log(result);
//     response.status(StatusCodes.OK).json({
//       result
//     });
//   } catch (error) {
//     console.error("Transaction error:", error);
//     response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       error: error instanceof Error ? error.message : 'Unexpected error with transaction'
//     });
//   }
// }
//# sourceMappingURL=users.js.map