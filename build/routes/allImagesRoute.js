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
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const allImagesRoute = express_1.default.Router();
allImagesRoute.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folderPathFullImage = `${path_1.default.resolve(__dirname, '../../images/original')}`;
    //check images
    const files = yield promises_1.default
        .readdir(folderPathFullImage)
        .catch(() => {
        res.status(500).send('Error occured loading the images');
        return null;
    });
    if (!files) {
        return;
    }
    //creating HTML response
    let htmlResponse = `
        <h1>All images</h1>
        <p>Below you can find all images that are accessible</p>
        <ul>
    `;
    files.forEach((file) => {
        htmlResponse = htmlResponse + `<li>${file}</li>`;
    });
    res.status(200).send(`${htmlResponse}</ul>`);
}));
exports.default = allImagesRoute;
