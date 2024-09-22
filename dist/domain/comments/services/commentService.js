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
exports.likeComment = likeComment;
exports.getCommentLikes = getCommentLikes;
exports.dislike = dislike;
const uuid_1 = require("uuid");
const database_1 = require("../../../db/database");
exports.default = {
    getAllCommentsById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, database_1.openDatabase)();
            return db.all('SELECT * FROM comments WHERE postId = ?', postId);
        });
    },
    addComment(postId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = (0, uuid_1.v4)();
            const db = yield (0, database_1.openDatabase)();
            yield db.run('INSERT INTO comments (id, postId, content) VALUES(?, ?, ?)', [commentId, postId, content]);
            return { commentId, postId, content };
        });
    }
};
function likeComment(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Abra a conexão com o banco de dados.
        const db = yield (0, database_1.openDatabase)();
        // validação se comentario existe
        const comment = yield db.get('SELECT * FROM comments WHERE id = ?', commentId);
        if (!comment) {
            throw new Error('Comentário não encontrado');
        }
        // TODO: Atualize a tabela de comentários, incrementandoo número de likes.
        yield db.run('UPDATE comments SET likes = likes + 1 WHERE id = ?', [commentId]);
    });
}
function getCommentLikes(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Abra a conexão com o banco de dados.
        const db = yield (0, database_1.openDatabase)();
        // TODO: Retorne o número de likes para o comentário especificado pelo ID.
        const count = yield db.get('SELECT likes FROM comments WHERE id = ?', commentId);
        return (yield count) ? count.likes : 0;
    });
}
function dislike(commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.openDatabase)();
        // TODO: Atualize a tabela de comentários, decrementandoo número de likes.
        yield db.run('UPDATE comments SET likes = likes - 1 WHERE id = ?', [commentId]);
    });
}
