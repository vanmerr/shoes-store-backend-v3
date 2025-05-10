// app.js
const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error.middleware");
const indexRoutes = require("./routes/index.routes");
const { uploadSingleFile, uploadMultipleFiles } = require("./middlewares/upload.middleware");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const yaml = require("js-yaml");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Shoes Store API" });
});

// Add routes
app.use("/api/v1", indexRoutes);

// API to upload a single file
app.post("/upload/single", uploadSingleFile, (req, res) => {
  res.json({ message: "File uploaded successfully", fileUrl: req.fileUrl });
});

// API to upload multiple files
app.post("/upload/multiple", uploadMultipleFiles, (req, res) => {
  res.json({ message: "Files uploaded successfully", fileUrls: req.fileUrls });
});
// Swagger setup
const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use(errorMiddleware.handleError);
app.use(errorMiddleware.notFound);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});
