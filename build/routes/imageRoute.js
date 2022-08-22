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
const imageControl_1 = __importDefault(require("../controllers/imageControl"));
const imageRoute = express_1.default.Router();
imageRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filename = req.query['filename'];
    const height = req.query['height']
        ? parseInt(req.query['height'], 10)
        : null;
    const width = req.query['width']
        ? parseInt(req.query['width'], 10)
        : null;
    //check if the request is available
    if (!filename || !height || !width) {
        res
            .status(400)
            .send('Please make sure url contains correct filename, height and width parameters');
        return;
    }
    //get the full path from the filename
    const filePathOriginalImage = `${path_1.default.resolve(__dirname, `../../images/original/${filename}.jpg`)}`;
    //thumbnail path in the ${filename}-${height}x${width} format
    const filePathThumbnailImage = `${path_1.default.resolve(__dirname, `../../images/thumbnail/${filename}-${height}x${width}.jpg`)}`;
    // Check if filename exists in Original folder and send error if not found
    const fullImage = yield promises_1.default
        .stat(filePathOriginalImage)
        .catch(() => {
        res.status(404).send('Image does not exist');
        return null;
    });
    if (!fullImage) {
        return;
    }
    // Check if thumbnail was already created
    const existingThumbnail = yield promises_1.default
        .stat(filePathThumbnailImage)
        .catch(() => {
        return null;
    });
    if (existingThumbnail) {
        promises_1.default.readFile(filePathThumbnailImage)
            .then((thumbnailData) => {
            res.status(200).contentType('jpg').send(thumbnailData);
        })
            .catch(() => {
            res.status(500).send('Error occured processing the image');
        });
    }
    else {
        // resizeing image
        imageControl_1.default
            .resizeImage({
            width,
            height,
            filePathOriginalImage,
            filePathThumbnailImage,
        })
            .then((resizedImage) => {
            res.status(200).contentType('jpg').send(resizedImage);
        })
            .catch(() => {
            res.status(500).send('Error occured Resizing the image');
        });
    }
}));
exports.default = imageRoute;
