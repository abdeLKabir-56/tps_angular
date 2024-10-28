"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    numberOfPages: { type: Number, required: true }, // This was previously 'pages'
    status: { type: String, required: true },
    price: { type: Number, required: true },
    pagesRead: { type: Number, required: true },
    format: { type: String, required: true },
    suggestedBy: { type: String },
    finished: { type: Number, required: true }
});
exports.default = mongoose_1.default.model('Book', bookSchema);
