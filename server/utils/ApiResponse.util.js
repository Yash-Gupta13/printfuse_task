const ApiResponse = (
  res,
  statusCode = 200,
  data,
  message = "Operation Executed..!"
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const ApiErrorResponse = (
  res,
  statusCode = 500,
  message = "An error occurred"
) => {
  res.status(statusCode).json({
    success: false,
    message: message, 
  });
};

export { ApiResponse, ApiErrorResponse };
