"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var winstonlogger_1 = __importDefault(require("./config/winstonlogger"));
var dbconfig_1 = require("./config/dbconfig");
var typedi_1 = __importDefault(require("typedi"));
var audioConvert_1 = __importDefault(require("./controller/audioConvert"));
var usercontroller_1 = __importDefault(require("./controller/usercontroller"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
dotenv_1["default"].config();
var dbConnection = typedi_1["default"].get(dbconfig_1.DataBaseConfig);
var app = (0, express_1["default"])();
// const app = express<ICustomRequest, express.Response>();
var PORT = 8445;
app.use((0, morgan_1["default"])('common', {
    stream: fs_1["default"].createWriteStream('./logs/application.log', { flags: 'a' })
}));
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.use((0, express_fileupload_1["default"])({
    limits: { fileSize: 5000 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: 'tempuploads/',
    preserveExtension: true,
    debug: true
}));
app.use('/audio', audioConvert_1["default"]);
app.use('/user', usercontroller_1["default"]);
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbConnection.checkConnection()];
            case 1:
                _a.sent();
                winstonlogger_1["default"].info("\u26A1\uFE0F [server]: Server is running at " + PORT);
                return [2 /*return*/];
        }
    });
}); });
