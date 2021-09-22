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
exports.User = void 0;
var sequelize_1 = require("sequelize");
var typedi_1 = require("typedi");
var dbconfig_1 = require("../config/dbconfig");
var User = /** @class */ (function () {
    function User(dataBaseConfig) {
        this.dataBaseConfig = dataBaseConfig;
        this.user = this.dataBaseConfig.sequelize.define("users", { id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            lastname: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false
            },
            firstname: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false
            },
            email: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false
            },
            password: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false
            },
            address: {
                type: new sequelize_1.DataTypes.STRING(500),
                allowNull: true
            },
            status: {
                type: new sequelize_1.DataTypes.INTEGER,
                defaultValue: '0',
                allowNull: true
            },
            isAdmin: {
                type: new sequelize_1.DataTypes.INTEGER,
                defaultValue: '0',
                allowNull: true
            }
        });
    }
    User = __decorate([
        (0, typedi_1.Service)(),
        __metadata("design:paramtypes", [dbconfig_1.DataBaseConfig])
    ], User);
    return User;
}());
exports.User = User;
