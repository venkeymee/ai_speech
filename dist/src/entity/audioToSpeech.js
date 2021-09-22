"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.AudioToTextSpeech = void 0;
var sequelize_1 = require("sequelize");
var typedi_1 = require("typedi");
var dbconfig_1 = require("../config/dbconfig");
var AudioToTextSpeech = /** @class */ (function () {
    function AudioToTextSpeech(dataBaseConfig) {
        this.dataBaseConfig = dataBaseConfig;
        this.user = this.dataBaseConfig.sequelize.define("audio_to_text", {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            wav_file_path: {
                type: new sequelize_1.DataTypes.STRING(1500),
                allowNull: false
            },
            text_file_path: {
                type: new sequelize_1.DataTypes.STRING(1500),
                allowNull: false
            }
        });
    }
    AudioToTextSpeech = __decorate([
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [dbconfig_1.DataBaseConfig])
    ], AudioToTextSpeech);
    return AudioToTextSpeech;
}());
exports.AudioToTextSpeech = AudioToTextSpeech;
