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
const promises_1 = __importDefault(require("fs/promises"));
const sharp_1 = __importDefault(require("sharp"));
// resize an image and saves it to the thumbnail path and returns the buffer of resized image
const resizeImage = ({ width, height, filePathOriginalImage, filePathThumbnailImage, }) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield promises_1.default
        .readFile(filePathOriginalImage)
        .catch(() => null);
    if (!data) {
        console.log('Here');
        return Promise.reject();
    }
    const imageBuffer = yield (0, sharp_1.default)(data)
        .resize(width, height)
        .toBuffer()
        .catch(() => null);
    if (!imageBuffer) {
        return Promise.reject();
        console.log('Here2');
    }
    return promises_1.default
        .writeFile(filePathThumbnailImage, imageBuffer)
        .then(() => {
        return imageBuffer;
    })
        .catch(() => {
        return Promise.reject();
        console.log('Here3');
    });
});
exports.default = { resizeImage };
