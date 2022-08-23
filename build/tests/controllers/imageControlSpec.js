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
const path_1 = __importDefault(require("path"));
const imageControl_1 = __importDefault(require("../../controllers/imageControl"));
const filePathOriginalImage = path_1.default.resolve(__dirname, '../../../images/original/santamonica.jpg');
const filePathThumbnailImage = path_1.default.resolve(__dirname, '../../../images/thumbnail/santamonica.jpg');
describe('The imageResizer function', () => {
    it('returns a buffer after sucessfully resizing an image', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageBuffer = yield imageControl_1.default.resizeImage({
            height: 200,
            width: 250,
            filePathOriginalImage,
            filePathThumbnailImage,
        });
        expect(imageBuffer).toBeInstanceOf(Buffer);
    }));
    it('rejects promise if something went wrong', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync(imageControl_1.default.resizeImage({
            height: 200,
            width: 250,
            filePathOriginalImage: '',
            filePathThumbnailImage,
        })).toBeRejected();
    }));
});
