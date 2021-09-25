
export enum  RESPONSESTATUS {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    EXCEPTION = "EXCEPTION",
    ERROR = "ERROR"
  }
  export const RESPONSE_EMPTY_DATA={}
  export enum RESPONSEMSG{
      INSERT_SUCCESS="Record inserted successful.",
      UPDATE_SUCCESS="Updated successful.",
      DELETE_SUCCESS="Deleted successful.",
      RETRIVE_SUCCESS="Operation Successful.",
      EXCEPTION='UnProcessable Entity.',
      ERROR = "Internal Server Error" 

      
  }

 let responseMesg = (messageCode, message='',data={}) => {
    const httpStatusCode = {
        SUCCESS: { status: 200, message,data},
        FAIL: { status: 401, message,data},
        INVALID: { status: 404, message,data },
        ERROR: { status:500, message,data},
        EXCEPTION: { status:422, message,data},
        AUTHENTICATION_FAIL: { status: 401, message,data}
    }
    return httpStatusCode[messageCode];
}
export default responseMesg;