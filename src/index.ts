import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
 
const startServer = async () => {
  const app = await createApp();

  app.listen(env.PORT, () => {
    logger.info(`Server running on http://localhost:${env.PORT}`);
  });
};

if (env.NODE_ENV !== "test") {
  startServer().catch((error) => {
    logger.error({ err: error }, "Failed to start server");
    process.exit(1);
  });
}

export { createApp };
