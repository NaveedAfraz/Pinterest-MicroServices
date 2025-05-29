## Running the Project with Docker

This project is composed of multiple Node.js microservices, each with its own Dockerfile, orchestrated via Docker Compose. The setup also includes RabbitMQ and Redis as dependencies.

### Project-Specific Requirements
- **Node.js Version:** All services use `node:22.13.1-slim` (set via `ARG NODE_VERSION=22.13.1` in Dockerfiles).
- **Dependencies:** Each service installs dependencies using `npm ci` for deterministic builds. Only production dependencies are installed in the final image.
- **Non-root User:** All services run as a non-root user for improved security.

### Required Environment Variables
- Each service requires its own `.env` file (see the `env_file` entry in `docker-compose.yml`). Ensure you have the following files with the necessary configuration:
  - `./api-proxypoint/.env`
  - `./identity-service/.env`
  - `./media-service/.env`
  - `./post-service/.env`
  - `./search-service/.env`

  The specific variables required depend on each service's implementation. Refer to each service's `.env` example or documentation for details.

### Build and Run Instructions
1. **Ensure Docker and Docker Compose are installed.**
2. **Prepare environment files:** Make sure all required `.env` files are present in each service directory.
3. **Build and start all services:**
   ```sh
   docker compose up --build
   ```
   This will build all service images and start the containers, including RabbitMQ and Redis.

### Special Configuration
- **RabbitMQ and Redis** are included as services and are required for inter-service communication and caching.
- **Data Persistence:** By default, RabbitMQ and Redis data are not persisted. To enable persistence, uncomment the `volumes` sections for `rabbitmq` and `redis` in `docker-compose.yml`.
- **Healthchecks:** Both RabbitMQ and Redis have healthchecks configured for improved reliability.

### Ports Exposed Per Service
| Service                | Container Port | Host Port |
|------------------------|---------------|-----------|
| API Proxy Point        | 3000          | 3000      |
| Identity Service       | 3001          | 3001      |
| Post Service           | 3002          | 3002      |
| Media Service          | 3003          | 3003      |
| Search Service         | 3004          | 3004      |
| RabbitMQ (AMQP)        | 5672          | 5672      |
| RabbitMQ (Management)  | 15672         | 15672     |
| Redis                  | 6379          | 6379      |

---

**Note:**
- All services are connected via the `backend` Docker network for internal communication.
- If you need to persist message queues or cache data, uncomment the `volumes` section in `docker-compose.yml`.
- For any service-specific configuration, refer to the respective `.env` files and service documentation.
