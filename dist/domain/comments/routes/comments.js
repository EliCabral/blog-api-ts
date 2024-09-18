"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = __importDefault(require("../controllers/commentController"));
const router = (0, express_1.Router)();
router.get('/posts/:id/comments', commentController_1.default.getComments);
router.post('/posts/:id/comments', commentController_1.default.addComment);
exports.default = router;
