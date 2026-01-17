import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      description: 'API endpoints for a task manager api documented on swagger',
      contact: {
        name: 'Vivek Kumar',
        email: 'vivek.indie.dev@gmail.com',
        url: 'https://github.com/vickvey/task-manager-api'
      },
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3500',
        description: 'Local server'
      }
    ]
  },
  apis: [path.join(__dirname, "./routes/*.js")] // ✅ CORRECT
}

const swaggerSpec = swaggerJSDoc(options)

function swaggerDocs(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs
