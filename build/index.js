"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const main_1 = __importDefault(require("./routes/main"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/api', main_1.default);
app.get('/', (_, res) => {
    res.status(200).send('server working');
});
app.get('/api', (_, res) => {
    res.status(200).send('server working');
});
app.listen(port, () => {
    // make sure thumbnail folder exists
    const thumbPath = path_1.default.resolve(__dirname, '../images/thumbnail');
    if (!fs_1.default.existsSync(thumbPath)) {
        fs_1.default.mkdirSync(thumbPath);
    }
    console.log(`server started at localhost:${port}'`);
});
exports.default = app;
