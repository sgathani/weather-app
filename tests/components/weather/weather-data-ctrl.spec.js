describe('Controller: weather', function() {
  beforeEach(module('weatherApp',
    'weatherApp.mocks.weatherRequestor'));

  var systemUnderTest,
    $rootScope,
    $q,
    weatherRequestor,
    scope;

  beforeEach(inject(function(_$q_, _$rootScope_, $controller, _weatherRequestor_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    weatherRequestor = _weatherRequestor_;
    scope = {};

    systemUnderTest = $controller('weatherCtrl', {
      $scope: scope,
    });

    $rootScope.$apply();
  }));

  describe('getWeatherData', function() {
    describe('on success', function() {
      beforeEach(function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.when('something'));
        //TODO: Make this data legit
      });

      it('should call weatherRequestor.getCurrentWeather', function() {
        scope.getWeatherData('norwalk', 'ct');
        expect(weatherRequestor.getCurrentWeather).toHaveBeenCalledWith('norwalk', 'ct');
      });

      it('should set showWeatherData to true after fetching weather data', function() {
        scope.showWeatherData = false;
        scope.getWeatherData('norwalk', 'ct');
        $rootScope.$digest();
        expect(scope.showWeatherData).toEqual(true);
      });

      it('should set weatherData to the return value of weatherRequestor.getCurrentWeather', function() {
        scope.getWeatherData('norwalk', 'ct');
        $rootScope.$digest();
        expect(scope.weatherData).toEqual('something');
      });
    });

    describe('on error', function() {
      beforeEach(function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.reject('There was an error'));
      });

      it('should alert on error', function() {
        spyOn(window, 'alert');
        scope.getWeatherData('norwalk', 'ct');
        $rootScope.$digest();
        expect(window.alert).toHaveBeenCalledWith('There was an error');
      });
    });
  });
});

