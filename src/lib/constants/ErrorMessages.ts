const ErrorMessages = Object.freeze({
  MESSAGES: {
    INTERNAL_SERVER_ERROR: 'internal server error',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    CANNOT_FULFILL_THE_REQUEST: 'Cannot fulfill the request',
    SERVER_EXECUTION_ERROR:
      'Something went wrong while executing server operations',
    SERVER_START_ERROR: 'Something went wrong Server could not be started',
    DATABASE_CONNECTION_ERROR:
      'Connot connect to database. Please check credentials.',
    MODELS_SYNC_FAILURE: 'Something went wrong while syncing database models',
    REDIS_SERVER_FAILURE:
      'Server halted due to multiple redis connection failures',
  },
})

export default ErrorMessages
