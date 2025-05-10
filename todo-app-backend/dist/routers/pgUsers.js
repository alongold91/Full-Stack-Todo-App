"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pgUsers_1 = require("../controllers/pgUsers");
const router = (0, express_1.Router)();
router.get('/get-all-users', pgUsers_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=pgUsers.js.map