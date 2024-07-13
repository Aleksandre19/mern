import logger from '../services/logger.js';

const handleDb = async (dbOperation) => {
  try {
    const data = await dbOperation;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const handleError = (error, res) => {
  logger.error(`Error Trace: ${error.stack}`);
  return res.status(500).json('Server error');
};

export { handleDb, handleError };
