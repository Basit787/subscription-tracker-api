import app from "./app.js";
import { connectToDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { initializeJobs } from "./jobs/index.js";

async function bootstrap() {
	try {
		await connectToDatabase();

		await initializeJobs();

		app.listen(env.PORT, () => {
			console.log(`Server running on port ${env.PORT}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

bootstrap();
