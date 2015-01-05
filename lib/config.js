'use strict';

var Configstore = require('configstore');
var fs = require('fs');
var pkg = require('../package.json');
var env = process.env;
var fixSudo = (process.platform === 'linux' && env.SUDO_USER);
if (fixSudo) {
    env.HOME = '/home/' + env.SUDO_USER;
}
var conf = new Configstore(pkg.name);
if (fixSudo && env.SUDO_UID && env.SUDO_GID) {
    try {
        fs.chownSync(conf.path, env.SUDO_UID, env.SUDO_GID);
    } catch (e) {}
}

module.exports.set = function(key, val) {
    conf.set(key, val);
};

module.exports.get = function(key) {
    return conf.get(key);
};

module.exports.del = function(key) {
    conf.del(key);
};

module.exports.all = function() {
    return conf.all;
};