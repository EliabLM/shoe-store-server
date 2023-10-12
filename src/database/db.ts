import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await connect(process.env.DB_MONGO || '');

    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.error('🚀 ~ connectDB ~ error:', error);

    process.exit(1);
  }
};

export default connectDB;
