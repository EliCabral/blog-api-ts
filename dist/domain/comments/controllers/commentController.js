"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.likeCommentById = likeCommentById;
exports.getCommentLikesById = getCommentLikesById;
exports.removeLikeById = removeLikeById;
const commentService_1 = __importStar(require("../services/commentService"));
exports.default = {
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const comments = yield commentService_1.default.getAllCommentsById(postId);
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
                const { postId } = req.params;
                const { content } = req.body;
                const newComment = yield commentService_1.default.addComment(postId, content);
                return res.status(201).json({
                    status: 201,
                    msg: newComment
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: 400,
                    msg: { error: "Erro ao adicionar comentário" }
                });
            }
        });
    }
};
function likeCommentById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commentId } = req.params;
        try {
            // TODO: Chame a função do serviço para adicionar um likeao comentário.
            yield (0, commentService_1.likeComment)(commentId);
            // TODO: Após adicionar o like, chame a função do serviçopara obter o número atualizado de likes.
            const likes = yield (0, commentService_1.getCommentLikes)(commentId);
            // TODO: Retorne o número de likes como resposta em formato JSON.
            res.status(200).json({
                status: 200,
                msg: { likes, msg: "Like adicionado com sucesso ao comentário!" }
            });
        }
        catch (error) {
            if (error.message === 'Comentário não encontrado') {
                res.status(404).json({
                    status: 404,
                    msg: { error: "Comentário não encontrado" }
                });
            }
            else {
                res.status(400).json({
                    status: 400, msg: { error: "Erro ao adicionar like ao comentário" }
                });
            }
        }
    });
}
function getCommentLikesById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commentId } = req.params;
        try {
            // TODO: Chame a função do serviço para obter o número delikes do comentário.
            const likes = yield (0, commentService_1.getCommentLikes)(commentId);
            // TODO: Retorne o número de likes como resposta em formato JSON.
            res.status(200).json({
                status: 200, msg: likes
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400, msg: { error: "Erro ao listar likes do comentario" }
            });
        }
    });
}
function removeLikeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { commentId } = req.params;
        try {
            // TODO: Chame a função do serviço para adicionar um deslikeao comentário.
            yield (0, commentService_1.dislike)(commentId);
            // TODO: Após remover o like, chame a função do serviçopara obter o número atualizado de likes.        
            const likes = yield (0, commentService_1.getCommentLikes)(commentId);
            // TODO: Retorne o número de likes como resposta em formato JSON.
            res.status(200).json({
                status: 200,
                msg: { likes, msg: "Like removido com sucesso!" }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                msg: { error: "Erro ao remover like do comentário" }
            });
        }
    });
}
