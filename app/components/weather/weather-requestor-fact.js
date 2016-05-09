(function() {
  /**
   * @ngdoc service
   * @module weatherApp
   * @name weatherRequestor
   *
   * @description
   * This factory is respon_sible for sending a request to the OpenWeatherMap
   */
  function weatherRequestor($q, $http, weatherConstants) {
    var svc = {};

    svc.getCurrentWeather = function(city, state) {
      var query = svc._getQuery(city, state);

      return svc.sendRequest(query).then(svc._getFormattedResponse, function(error) {
        return $q.reject(error);
      });
    };

    svc.sendRequest = function(query) {
      return $http.get(weatherConstants.openWeatherRequestUrl, {
        method: 'JSONP',
        params: {
          appid: weatherConstants.apiKey,
          units: weatherConstants.openWeatherFarheneitUnit,
          q: encodeURIComponent(query)
        }
      })
    };

    svc._getQuery = function(city, state) {
      if (city && state) {
        return city + ',' + state;
      }

      if (city) {
        return city;
      }

      if (state) {
        return state;
      }
    };

    svc._getFormattedResponse = function(response) {
      response = response.data;
      return {
        currentWeather: response.weather[0].description,
        lastReading: moment(new Date(response.dt * 1000)).format('LL'),
        temperature: response.main.temp,
        humidity: response.main.humidity,
        sunrise: moment(new Date(response.sys.sunrise * 1000)).format('HH:mm'),
        sunset: moment(new Date(response.sys.sunset * 1000)).format('HH:mm')
      };
    };

    return svc;
  }

  angular.module('weatherApp').factory('weatherRequestor', weatherRequestor);
}());
