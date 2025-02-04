import { OpenAPIV3 } from 'openapi-types';

const openapiSchema: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Next.js Swagger API',
    version: '1.0.0',
    description: 'API documentation for Next.js Swagger Server',
  },
  servers: [{ url: 'http://localhost:3000/api' }],
  paths: {
    '/swagger/account/register': {
      post: {
        summary: 'Register a new user',
        description: 'Create an account by providing user details.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: [
                  'email',
                  'password',
                  'firstName',
                  'lastName',
                  'dateOfBirth',
                ],
                properties: {
                  email: { type: 'string', example: 'user@example.com' },
                  password: { type: 'string', example: 'SecurePass123!' },
                  firstName: { type: 'string', example: 'John' },
                  lastName: { type: 'string', example: 'Doe' },
                  dateOfBirth: {
                    type: 'string',
                    format: 'date',
                    example: '1990-01-01',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Successful registration',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: {
                      type: 'string',
                      example: 'fake-access-token',
                    },
                    refreshToken: {
                      type: 'string',
                      example: 'fake-refresh-token',
                    },
                  },
                },
              },
            },
          },
          '400': { description: 'Missing required fields' },
          '409': { description: 'User already exists' },
        },
      },
    },
    '/swagger/account/login': {
      post: {
        summary: 'User Login',
        description: 'Authenticate user and return access token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'user@example.com' },
                  password: { type: 'string', example: 'SecurePass123!' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Successful login',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    accessToken: {
                      type: 'string',
                      example: 'fake-access-token',
                    },
                    refreshToken: {
                      type: 'string',
                      example: 'fake-refresh-token',
                    },
                    userId: {
                      type: 'string',
                      example: 'a3f5d7c8-3a2b-4b68-9b1a-89d6fbb3e123',
                    },
                  },
                },
              },
            },
          },
          '401': { description: 'Invalid credentials' },
        },
      },
    },
    '/swagger/account/me': {
      get: {
        summary: 'Get User Profile',
        description: "Fetch the logged-in user's profile.",
        security: [{ BearerAuth: [] }],
        responses: {
          '200': {
            description: 'User profile retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      example: 'a3f5d7c8-3a2b-4b68-9b1a-89d6fbb3e123',
                    },
                    email: { type: 'string', example: 'user@example.com' },
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                    dateOfBirth: { type: 'string', example: '1990-01-01' },
                    sightingsNum: { type: 'integer', example: 5 },
                    pictureUrl: {
                      type: 'string',
                      nullable: true,
                      example: 'https://example.com/pic.jpg',
                    },
                  },
                },
              },
            },
          },
          '401': { description: 'Unauthorized - Missing or invalid token' },
          '404': { description: 'User not found' },
        },
      },
    },
    '/swagger/flowers': {
      get: {
        summary: 'List/Filter Flowers',
        description: 'Fetch a paginated list of flowers with optional filters.',
        parameters: [
          {
            name: 'page',
            in: 'query',
            required: false,
            schema: { type: 'integer', example: 1 },
            description: 'Page number',
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', example: 10 },
            description: 'Items per page',
          },
          {
            name: 'name',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter by flower name',
          },
          {
            name: 'latinName',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter by Latin name',
          },
          {
            name: 'genus',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter by genus',
          },
          {
            name: 'authorId',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filter by author ID',
          },
        ],
        responses: {
          '200': {
            description: 'Successful response with a list of flowers',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: 'bdd68375-206c-46f8-878a-5c2bdefed86e',
                          },
                          name: {
                            type: 'string',
                            example: 'African Blood Lily',
                          },
                          latinName: {
                            type: 'string',
                            example: 'Scadoxus multiflorus',
                          },
                          genus: { type: 'string', example: 'Blood Lilies' },
                          pictureUrl: {
                            type: 'string',
                            nullable: true,
                            example: null,
                          },
                          authorId: {
                            type: 'string',
                            example: '59864750-f6d4-42bd-aa5c-8476bc9b750f',
                          },
                          sightingsNum: { type: 'integer', example: 0 },
                        },
                      },
                    },
                    order: {
                      type: 'array',
                      items: { type: 'string' },
                      example: [['name', 'ASC']],
                    },
                    total: { type: 'integer', example: 3 },
                    page: { type: 'integer', example: 1 },
                    limit: { type: 'integer', example: 10 },
                  },
                },
              },
            },
          },
          '400': { description: 'Invalid request parameters' },
        },
      },
    },
  },
  components: {
    schemas: {
      RegisterActionDto: {
        type: 'object',
        required: ['email', 'password', 'firstName', 'lastName', 'dateOfBirth'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          dateOfBirth: { type: 'string', format: 'date' },
        },
      },
      AuthTokenResponseDto: {
        type: 'object',
        required: ['accessToken', 'refreshToken'],
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
        },
      },
      LoginActionDto: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
  },
};

export default openapiSchema;
