(function() {
  function weatherDataValidator() {
    var svc = {};

    svc.isValid = function() {
      return true;
    };

    return svc;
  }

  angular.module('weatherApp.mocks.weatherDataValidator', []).factory('weatherDataValidator', weatherDataValidator);
}());
