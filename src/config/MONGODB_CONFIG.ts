import config from 'config';

export default {
  MONGODB_URI: config.get('MONGODB_URI') as string
}