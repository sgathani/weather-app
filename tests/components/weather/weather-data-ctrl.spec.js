describe('Controller: weatherDataCtrl', function() {
  beforeEach(module('weatherApp',
    'weatherApp.mocks.weatherRequestor',
    'weatherApp.mocks.weatherDataValidator'));

  var systemUnderTest,
    $rootScope,
    $q,
    weatherRequestor,
    weatherDataValidator,
    scope;

  beforeEach(inject(function(_$q_, _$rootScope_, $controller, _weatherRequestor_, _weatherDataValidator_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    weatherRequestor = _weatherRequestor_;
    weatherDataValidator = _weatherDataValidator_;
    scope = {};

    systemUnderTest = $controller('weatherDataCtrl', {
      $scope: scope,
    });

    $rootScope.$apply();
  }));

  it('should set fetchInProgress to false', function() {
    expect(systemUnderTest.fetchInProgress).toEqual(false);
  });

  it('should set showWeatherData to false', function() {
    expect(systemUnderTest.showWeatherData).toEqual(false);
  });

  describe('getWeatherData', function() {
    it('should set fetchInProgress to true', function() {
      systemUnderTest.fetchInProgress = false;
      systemUnderTest.getWeatherData('norwalk');
      expect(systemUnderTest.fetchInProgress).toEqual(true);
    });

    it('should set showWeatherData to false', function() {
      systemUnderTest.showWeatherData = true;
      systemUnderTest.getWeatherData('norwalk');
      expect(systemUnderTest.showWeatherData).toEqual(false);
    });

    it('should call weatherDataValidator.isValid to check if the input is valid', function() {
      spyOn(weatherDataValidator, 'isValid');
      systemUnderTest.getWeatherData('norwalk', 'ct');
      expect(weatherDataValidator.isValid).toHaveBeenCalledWith('norwalk', 'ct');
    });

    it('should trim the city and state before calling isValid', function() {
      spyOn(weatherDataValidator, 'isValid');
      systemUnderTest.getWeatherData('   norwalk', 'ct    ');
      expect(weatherDataValidator.isValid).toHaveBeenCalledWith('norwalk', 'ct');
    });

    it('should not send a request if isValid returns false', function() {
      spyOn(weatherDataValidator, 'isValid').and.returnValue(false);
      spyOn(weatherRequestor, 'getCurrentWeather');
      systemUnderTest.getWeatherData('', '');
      expect(weatherRequestor.getCurrentWeather).not.toHaveBeenCalled();
    });

    describe('on success', function() {
      beforeEach(function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.when({temperature: 60}));
      });

      it('should call weatherRequestor.getCurrentWeather', function() {
        systemUnderTest.getWeatherData('norwalk', 'ct');
        expect(weatherRequestor.getCurrentWeather).toHaveBeenCalledWith('norwalk', 'ct');
      });

      it('should set showWeatherData to true after fetching weather data', function() {
        systemUnderTest.showWeatherData = false;
        systemUnderTest.getWeatherData('norwalk', 'ct');
        $rootScope.$digest();
        expect(systemUnderTest.showWeatherData).toEqual(true);
      });

      it('should set weatherData to the return value of weatherRequestor.getCurrentWeather', function() {
        systemUnderTest.getWeatherData('norwalk', 'ct');
        $rootScope.$digest();
        expect(systemUnderTest.weatherData).toEqual({temperature: 60});
      });

      it('should set fetchInProgress to false', function() {
        systemUnderTest.getWeatherData('norwalk');
        $rootScope.$digest();
        expect(systemUnderTest.fetchInProgress).toEqual(false);
      });
    });

    describe('on error', function() {
      it('should alert a generic message if the error field is not present on error', function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.reject({error_code: '404'}));
        spyOn(window, 'alert');
        systemUnderTest.getWeatherData('norwalk', 'ct');
        $rootScope.$digest();
        expect(window.alert).toHaveBeenCalledWith('There was an error requesting the data.');
      });

      it('should alert the message on error', function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.reject({cod: '404', message: 'Error: Not found city'}));
        spyOn(window, 'alert');
        systemUnderTest.getWeatherData('q');
        $rootScope.$digest();
        expect(window.alert).toHaveBeenCalledWith('Error: Not found city');
      });

      it('should set fetchInProgress to false', function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.reject({cod: '404', message: 'Error: Not found city'}));
        systemUnderTest.getWeatherData('q');
        $rootScope.$digest();
        expect(systemUnderTest.fetchInProgress).toEqual(false);
      });
    });
  });
});

