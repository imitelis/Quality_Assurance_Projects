'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    
    if (!initNum && !initUnit) {
      return res.send('invalid number and unit');
    } else if (!initNum) {
      return res.send('invalid number');
    } else if (!initUnit) {
      return res.send('invalid unit');
    }
    
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let message = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    return res.json({ initNum, initUnit, returnNum, returnUnit, string: message })
  })
};
