import createApp from "./app.js";
import { PORT } from "./secrets.js";
import { connectDB } from "./config/db.js";

const app = createApp();

// Connect to database once at startup
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
