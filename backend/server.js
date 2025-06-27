import createApp from "./app.js";
import {PORT} from "./secrets.js";

const app = createApp();

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
