const util = {
    map: function(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    },

    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    newChar: function(){
        var c = this.randomInt(63, 122 - 1);
        
        if (c === 63) c = 32;
        if (c === 64) c = 46;

        return String.fromCharCode(c);
    },

    weightedMean: function (arrValues, arrWeights) {

        var result = arrValues.map(function (value, i) {
      
          var weight = arrWeights[i];
          var sum = value * weight;
      
          return [sum, weight];
        }).reduce(function (p, c) {
      
          return [p[0] + c[0], p[1] + c[1]];
        }, [0, 0]);
      
        return result[0] / result[1];
    },

    limit: function (val, min, max) {
        let value = val < min ? min : val;
        return value > max ? max : value;
    },

    rgbToHsl: function(r, g, b) {
        r /= 255, g /= 255, b /= 255;
      
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
      
        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
      
          h /= 6;
        }
      
        return [h * 100, s * 100, l * 100];
      }
}

export default util;