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
exports.createUserSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.createUserSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(1, 'First Name is a mandatory field'),
    lastName: zod_1.z.string().min(1, 'Last Name is a mandatory field'),
    email: zod_1.z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format')
        .refine((email) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if email exists in database
        const existingUser = yield prisma.user.findUnique({
            where: { email: email }
        });
        // Return true if email doesn't exist (is unique)
        return !existingUser;
    }), {
        message: 'Email already in use'
    }),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: zod_1.z.string().min(1, 'Please confirm your password')
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match"
});
