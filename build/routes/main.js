"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing helper modules
const express_1 = __importDefault(require("express"));
const imageRoute_1 = __importDefault(require("./imageRoute"));
const allImagesRoute_1 = __importDefault(require("./allImagesRoute"));
//establishing router
const routes = express_1.default.Router();
//using routes
routes.use('/images', imageRoute_1.default);
routes.use('/listImages', allImagesRoute_1.default);
//exporting routes
exports.default = routes;
