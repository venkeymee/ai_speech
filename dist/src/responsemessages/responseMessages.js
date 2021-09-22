"use strict";
exports.__esModule = true;
exports.RESPONSEMSG = exports.RESPONSE_EMPTY_DATA = exports.RESPONSESTATUS = void 0;
var RESPONSESTATUS;
(function (RESPONSESTATUS) {
    RESPONSESTATUS["SUCCESS"] = "SUCCESS";
    RESPONSESTATUS["FAIL"] = "FAIL";
    RESPONSESTATUS["EXCEPTION"] = "EXCEPTION";
})(RESPONSESTATUS = exports.RESPONSESTATUS || (exports.RESPONSESTATUS = {}));
exports.RESPONSE_EMPTY_DATA = {};
var RESPONSEMSG;
(function (RESPONSEMSG) {
    RESPONSEMSG["INSERT_SUCCESS"] = "Record inserted successful.";
    RESPONSEMSG["UPDATE_SUCCESS"] = "Updated successful.";
    RESPONSEMSG["DELETE_SUCCESS"] = "Delete successful.";
    RESPONSEMSG["RETRIVE_SUCCESS"] = "Operation Successful";
    RESPONSEMSG["EXCEPTION"] = "Exception while processing";
})(RESPONSEMSG = exports.RESPONSEMSG || (exports.RESPONSEMSG = {}));
var responseMesg = function (messageCode, message, data) {
    if (message === void 0) { message = ''; }
    if (data === void 0) { data = {}; }
    var httpStatusCode = {
        SUCCESS: { status: 'SUCCESS', code: 200, message: message, data: data },
        FAIL: { code: 500, status: 'INTERNEL SERVER ERROR', message: message, data: data },
        INVALID: { status: "INVALID EMAIL ADDRESS", message: message, data: data },
        EXCEPTION: { code: 508, status: 'FAILED', message: message, data: data },
        AUTHENTICATION_FAIL: { code: 401, status: 'Authetication Error', message: message, data: data }
    };
    return httpStatusCode[messageCode];
};
exports["default"] = responseMesg;
