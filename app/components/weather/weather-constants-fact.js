(function() {
  /**
   * @ngdoc service
   * @module weatherApp
   * @name
   *
   * @description
   * This factory is responsible for
   */
  function weatherConstants() {
    var svc = {};
    svc.apiKey = '7682113faf84bf66dd5ad7d810e94594';
    svc.openWeatherRequestUrl = 'http://api.openweathermap.org/data/2.5/weather/';
    svc.openWeatherFarheneitUnit = 'imperial';

    return svc;
  }

  angular.module('weatherApp').factory('weatherConstants', weatherConstants);
}());
