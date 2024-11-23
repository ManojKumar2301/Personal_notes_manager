const express = require("express");
const cors = require("cors");
const notesRoutes = require("./notesRoutes");
const sequelize = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", notesRoutes);

const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
