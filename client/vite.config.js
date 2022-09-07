import dotenv from 'dotenv';

dotenv.config();

export default {
  server: {
    port: 3000
  },
  root: 'client/src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
};
