import swaggerJSDoc from 'swagger-jsdoc';

const url = `http://${process.env.HOST}:${process.env.PORT}`;

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'catalyst API',
      version: '1.0.0',
      description: 'catalyst API docs',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url,
      },
    ],
  },
  apis: [
    './src/interfaces/*.ts',
    './src/routes/*.ts',
  ],
};

export default swaggerJSDoc(options);
