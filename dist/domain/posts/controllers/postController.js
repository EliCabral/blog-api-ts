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
const postService_1 = __importDefault(require("../services/postService"));
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
