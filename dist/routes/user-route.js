"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controler_1 = require("../controllers/user-controler");
const router = (0, express_1.Router)();
router.get('/', user_controler_1.getUsers);
router.get('/:id', user_controler_1.getUserId);
router.post('/', user_controler_1.postUser);
router.put('/:id', user_controler_1.updateUser);
router.delete('/:id', user_controler_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user-route.js.map