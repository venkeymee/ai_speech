
export enum  RESPONSESTATUS {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    EXCEPTION = "EXCEPTION"
  }
  export const RESPONSE_EMPTY_DATA={}
  export enum RESPONSEMSG{
      INSERT_SUCCESS="Record inserted successful.",
      UPDATE_SUCCESS="Updated successful.",
      DELETE_SUCCESS="Deleted successful.",
      RETRIVE_SUCCESS="Operation Successful.",
      EXCEPTION='Exception while processing.' 

      
  }

 let responseMesg = (messageCode, message='',data={}) => {
    const httpStatusCode = {
        SUCCESS: { status: 200, message,data},
        FAIL: { status: 500, message,data},
        INVALID: { status: 404, message,data },
        EXCEPTION: { status:508, message,data},
        AUTHENTICATION_FAIL: { status: 401, message,data}
    }
    return httpStatusCode[messageCode];
}
export default responseMesg;