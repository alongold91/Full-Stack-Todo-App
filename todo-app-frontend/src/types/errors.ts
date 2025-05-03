export interface ApiError {
    response: {
      message: string;
      data: {
        details: Array<{
          message: string;
        }>;
      };
    };
    message: string;
  }