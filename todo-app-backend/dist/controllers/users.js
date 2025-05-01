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
