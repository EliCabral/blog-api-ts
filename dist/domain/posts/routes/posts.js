"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../controllers/postController"));
const router = (0, express_1.Router)();
router.get('/posts', postController_1.default.getAllPosts);
router.get('/posts/:id', postController_1.default.getPost);
router.post('/posts', postController_1.default.addPost);
exports.default = router;
