export interface errorResponse {
  response: { data: errorObject };
}

export interface errorObject {
  error: string;
}
