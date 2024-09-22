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
exports.likePost = likePost;
exports.getPostLikes = getPostLikes;
exports.dislike = dislike;
const uuid_1 = require("uuid");
const database_1 = require("../../../db/database");
exports.default = {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, database_1.openDatabase)();
            return yield db.all('SELECT * FROM posts');
        });
    },
    createPost(title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const db = yield (0, database_1.openDatabase)();
            yield db.run('INSERT INTO posts (id, title, content) VALUES (?, ?, ?)', [id, title, content]);
            return { id, title, content };
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, database_1.openDatabase)();
            return yield db.get('SELECT * FROM posts WHERE id = ?', id);
        });
    }
};
function likePost(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.openDatabase)();
        // TODO: Atualize a tabela de posts, incrementando o número de likes.
        yield db.run('UPDATE posts SET likes = likes + 1 WHERE id = ?', [id]);
    });
}
function getPostLikes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.openDatabase)();
        // TODO: Retorne o número de likes para o post especificado pelo ID.
        const count = yield db.get('SELECT likes FROM posts WHERE id = ?', id);
        return (yield count) ? count.likes : 0;
    });
}
function dislike(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield (0, database_1.openDatabase)();
        // TODO: Atualize a tabela de comentários, decrementandoo número de likes.
        yield db.run('UPDATE posts SET likes = likes - 1 WHERE id = ?', [id]);
    });
}
