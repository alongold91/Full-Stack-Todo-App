"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const { Pool, Client } = pg_1.default;
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString
});
exports.default = pool;
//# sourceMappingURL=db.js.map