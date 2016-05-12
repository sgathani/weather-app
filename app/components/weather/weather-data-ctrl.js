(function() {
  function weatherDataCtrl($scope, weatherRequestor) {
    $scope.city = 'norwalk';
    $scope.state = 'ct';
    $scope.fetchInProgress = false;
    $scope.showWeatherData = false;

    $scope.getWeatherData = function(city, state) {
      $scope.fetchInProgress = true;
      $scope.showWeatherData = false;
      city = city ? city.trim() : city;
      state = state ? state.trim() : state;

      if (!$scope.isInputValid(city, state)) {
        return;
      }

      return weatherRequestor.getCurrentWeather(city, state).then(function(weatherData) {
        $scope.weatherData = weatherData;
        $scope.showWeatherData = true;
      }, function(error) {
        if (error.hasOwnProperty('message')) {
          alert(error.message);
        } else {
          alert('There was an error requesting the data.');
        }
      }).finally(function() {
        $scope.fetchInProgress = false;
      });
    };

    $scope.isInputValid = function(city, state) {
      if(!city.trim() && !state.trim()) {
        alert('Please enter a city or state.');
        return false;
      }

      if((city && !$scope.containsOnlyLetters(city)) || (state && !$scope.containsOnlyLetters(state))) {
        alert('Input values cannot contain numbers or special characters.');
        return false;
      }

      return true;
    };

    $scope.containsOnlyLetters = function(value) {
      var letterOnlyMatch = /^[A-Za-z\s]+$/g;
      return letterOnlyMatch.test(value);
    };
  }

  angular.module('weatherApp').controller('weatherDataCtrl', weatherDataCtrl);
}());
