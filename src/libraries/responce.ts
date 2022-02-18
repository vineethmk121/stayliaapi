export const makeApiResponce = (message: string, type: number, statusCode: number, data: object) => {
    let responce: any = {
        message: message,
        type: type,
        code: statusCode,
        data: data ? data : []
    };
    return responce;
};
