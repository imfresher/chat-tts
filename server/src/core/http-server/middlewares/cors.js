import { SERVER_HOST, IS_PRODUCTION } from '../../../constants';

const corsMiddleware = async (request, reply) => {
  // Allow only a specific client to request to the API (depending on the env)
  if (!IS_PRODUCTION) {
    reply.header('Access-Control-Allow-Origin', `${SERVER_HOST}:3000`);
  }

  // Allow several headers for our requests
  reply.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  reply.header('Access-Control-Allow-Credentials', true);
}

export default corsMiddleware
