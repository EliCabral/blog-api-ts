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
const commentService_1 = __importDefault(require("../services/commentService"));
exports.default = {
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const comments = yield commentService_1.default.getAllCommentsById(id);
                return res.status(200).json({
                    status: 200, msg: comments
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: 400, msg: { error: "Erro ao listar comentários" }
                });
            }
        });
    },
    addComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { content } = req.body;
                const newComment = yield commentService_1.default.addComment(id, content);
                return res.status(200).json({
                    status: 200, msg: newComment
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: 400, msg: { error: "Erro ao adicionar comentario" }
                });
            }
        });
    }
};
