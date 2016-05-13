(function() {
  function weatherDataValidator() {
    var svc = {};

    svc.isValid = function(city, state) {
      if((!city || !city.trim()) && (!state || !state.trim())) {
        alert('Please enter a city or state.');
        return false;
      }

      if((city && !svc._containsOnlyLetters(city)) || (state && !svc._containsOnlyLetters(state))) {
        alert('Input values cannot contain numbers or special characters.');
        return false;
      }

      return true;
    };

    svc._containsOnlyLetters = function(value) {
      var letterOnlyMatch = /^[A-Za-z\s]+$/g;
      return letterOnlyMatch.test(value);
    };

    return svc;
  }

  angular.module('weatherApp').factory('weatherDataValidator', weatherDataValidator);
}());
