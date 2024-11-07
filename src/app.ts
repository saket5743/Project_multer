import express, { Request, Response } from 'express'
import connectDB from './db/connect';
import multer from 'multer'
import path from 'path'

const app = express();
const port = 3050;

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    return cb(null, "./uploads");
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(
      // null, file.filename + "-" + Date.now() + path.extname(file.originalname)
      null, Date.now() + "--" + file.originalname
    )
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 * 3 },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const filetypes = new RegExp("/jpeg|jpg|png|gif");
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    )

    if (extname) {
      return cb(null, true)
    } else {
      cb(new Error("Error:Images Only"));
    }
  }

});

app.use(express.static(__dirname));


app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"))
});

// Uploading a single file
// app.post('/upload', upload.single("file"), (req: Request, res: Response): any => {
//   if (req.file) {
//     res.status(200).json({
//       message: 'Files uploaded successfully',
//       file: req.file,
//     })
//   } else {
//     res.status(400).json({ message: 'File upload failed' });
//   }
// });

// Uploading a multiple file
app.post('/upload', upload.array("files", 4), (req: Request, res: Response): any => {
  if (req.files) {
    res.status(200).json({
      message: 'Files uploaded successfully',
      files: req.files,
    });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
})

const start = async () => {
  await connectDB();
  console.log('Database Connected');
  app.listen(port, () => {
    console.log(`The port is listening on port: ${port}`)
  })
}

start()