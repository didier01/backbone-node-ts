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
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUserId = exports.getUsers = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.findAll();
    res.json({
        msg: "GetUsers",
        users,
    });
});
exports.getUsers = getUsers;
const getUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const user = yield user_model_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: `El usuario con el id: ${id} no existe!!!`,
        });
    }
    res.json({
        msg: "GetUserId",
        user,
    });
});
exports.getUserId = getUserId;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { body } = req;
    try {
        const emailExist = yield user_model_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (emailExist) {
            return res.status(400).json({
                msg: "Ya existe un usuario con este correo",
            });
        }
        const userToSave = user_model_1.default.build(body);
        yield userToSave.save();
        res.json({
            msg: "postUser",
            body,
        });
    }
    catch (error) {
        console.log("error");
        res.status(500).json({
            msg: "Error en el servidor",
        });
    }
});
exports.postUser = postUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let { body } = req;
    try {
        const userExist = yield user_model_1.default.findByPk(id);
        if (!userExist) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`,
            });
        }
        const emailExist = yield user_model_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (emailExist) {
            return res.status(400).json({
                msg: "Ya existe un usuario con este correo",
            });
        }
        yield userExist.update(body);
        res.json({
            msg: "putUser actualizado",
            body,
        });
    }
    catch (error) {
        console.log("error");
        res.status(500).json({
            msg: "Error en el servidor",
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    const user = yield user_model_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: `El usuario con el id: ${id} no existe!!!`,
        });
    }
    yield user.update({ status: false });
    // await user.destroy();
    res.json({
        msg: "deleteUser Usuario eliminado",
        id,
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user-controler.js.map