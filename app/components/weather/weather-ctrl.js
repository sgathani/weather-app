(function() {
  function weatherCtrl($scope, weatherRequestor) {
    $scope.city = 'norwalk';
    $scope.state = 'ct';
    $scope.getWeatherData = function(city, state) {
      weatherRequestor.getCurrentWeather(city, state).then(function(weatherData) {
        $scope.showWeatherData = true;
        $scope.weatherData = weatherData;
      }, function(error) {
        alert(error);
      });
    };
  }

  angular.module('weatherApp').controller('weatherCtrl', weatherCtrl);
}());
