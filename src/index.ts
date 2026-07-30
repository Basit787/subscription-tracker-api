import app from "./app.js";
import { env } from "./config/env.js";
import { connectToDatabase } from "./config/db.js";

async function bootstrap() {
	try {
		await connectToDatabase();

		app.listen(env.PORT, () => {
			console.log(`Server running on port ${env.PORT}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

bootstrap();
