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
exports.likePostById = likePostById;
exports.getPostLikesById = getPostLikesById;
exports.removeLikeById = removeLikeById;
const postService_1 = __importStar(require("../services/postService"));
exports.default = {
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield postService_1.default.getPosts();
                return res.status(200).json({
                    status: 200, msg: posts
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: 400, msg: { error: "Erro ao listar posts" }
                });
            }
        });
    },
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield postService_1.default.getPostById(id);
                return res.status(200).json({
                    status: 200, msg: post
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: 400, msg: { error: "Post não encontrado" }
                });
            }
        });
    },
    addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                const newPost = yield postService_1.default.createPost(title, content);
                return res.status(200).json({
                    status: 200, msg: newPost
                });
            }
            catch (error) {
                return res.status(400).json({
                    status: 400, msg: { error: "Erro ao criar post" }
                });
            }
        });
    },
};
function likePostById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // TODO: Chame a função do serviço para adicionar um likeà postagem.
            yield (0, postService_1.likePost)(id);
            // TODO: Após adicionar o like, chame a função do serviço para obter o número atualizado de likes.
            const likes = yield (0, postService_1.getPostLikes)(id);
            // TODO: Retorne o número de likes como resposta em formato JSON.
            res.status(200).json({
                status: 200, msg: { likes, msg: "Like adicionado com sucesso ao post!" }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400, msg: { error: "Erro ao adicionar like ao post" }
            });
        }
    });
}
function getPostLikesById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // TODO: Chame a função do serviço para obter o número de likes da postagem.
            const likes = yield (0, postService_1.getPostLikes)(id);
            // TODO: Retorne o número de likes como resposta em formato JSON.
            res.status(200).json({
                status: 200, msg: likes
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400, msg: { error: "Erro ao listar os likes do post" }
            });
        }
    });
}
function removeLikeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            // TODO: Chame a função do serviço para adicionar um deslikeao comentário.
            yield (0, postService_1.dislike)(id);
            // TODO: Após remover o like, chame a função do serviçopara obter o número atualizado de likes.        
            const likes = yield (0, postService_1.getPostLikes)(id);
            // TODO: Retorne o número de likes como resposta em formato JSON.
            res.status(200).json({
                status: 200,
                msg: { likes, msg: "Like removido com sucesso!" }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 400,
                msg: { error: "Erro ao remover like do post" }
            });
        }
    });
}
