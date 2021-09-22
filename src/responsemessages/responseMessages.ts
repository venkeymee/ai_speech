
export enum  RESPONSESTATUS {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL",
    EXCEPTION = "EXCEPTION"
  }
  export const RESPONSE_EMPTY_DATA={}
  export enum RESPONSEMSG{
      INSERT_SUCCESS="Record inserted successful.",
      UPDATE_SUCCESS="Updated successful.",
      DELETE_SUCCESS="Delete successful.",
      RETRIVE_SUCCESS="Operation Successful",
      EXCEPTION='Exception while processing'

      
  }

 let responseMesg = (messageCode, message='',data={}) => {
    const httpStatusCode = {
        SUCCESS: { status: 'SUCCESS',code: 200, message,data},
        FAIL: { code: 500, status: 'INTERNEL SERVER ERROR', message,data},
        INVALID: { status: "INVALID EMAIL ADDRESS", message,data },
        EXCEPTION: { code:508, status:'FAILED',message,data},
        AUTHENTICATION_FAIL: { code: 401, status: 'Authetication Error', message,data}
    }
    return httpStatusCode[messageCode];
}
export default responseMesg;