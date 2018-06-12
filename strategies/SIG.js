var log = require('../core/log');

var method = {};

method.init = function() {
  this.name = 'Triple Moving Average';
  this.requiredHistory = this.settings.long;

  this.addIndicator('short', 'SMA', this.settings.short)
  this.addIndicator('medium', 'SMA', this.settings.medium)
  this.addIndicator('long', 'SMA', this.settings.long)

  this.prevAdvice;
}

method.update = function(candle) {
  this.indicators.short.update(candle.close)
  this.indicators.medium.update(candle.close)
  this.indicators.long.update(candle.close)
}

method.check = function() {
  const short = this.indicators.short.result;
  const medium = this.indicators.medium.result;
  const long = this.indicators.long.result;

  advice = 'short'

  if((short > medium) && (medium > long)) {
    advice = 'long'
  }

  if (advice === this.prevAdvice) {
    advice = 'same'
  } else {
    this.prevAdvice = advice
  }
  
  this.advice(advice)
}

module.exports = method;
