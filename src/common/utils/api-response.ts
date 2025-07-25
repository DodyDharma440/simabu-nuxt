export const createResponse = <T>(data: T, status: number = 200) => {
  return {
    ok: true,
    statusCode: status,
    message: "Success",
    data,
  };
};
