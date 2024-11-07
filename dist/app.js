"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3050;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + "-" + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
app.use(express_1.default.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "index.html"));
});
// Uploading a single file
// app.post('/upload', upload.single("file"), (req: Request, res: Response): any => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded')
//   }
//   res.send(`file uploaded: ${req.file.filename}`)
// });
// Uploading a multiple file
app.post('/upload', upload.array("files", 4), (req, res) => {
    if (req.files) {
        res.status(200).json({
            message: 'Files uploaded successfully',
            files: req.files,
        });
    }
    else {
        res.status(400).json({ message: 'File upload failed' });
    }
});
app.listen(port, () => {
    console.log(`The port is listening on port ${port}`);
});
