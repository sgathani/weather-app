describe('Controller: weatherDataCtrl', function() {
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

    systemUnderTest = $controller('weatherDataCtrl', {
      $scope: scope,
    });

    $rootScope.$apply();
  }));

  it('should set fetchInProgress to false', function() {
    expect(scope.fetchInProgress).toEqual(false);
  });

  describe('containsOnlyLetters', function() {
    it('should return true of the input contains only letters', function() {
      expect(scope.containsOnlyLetters('norwalk')).toEqual(true);
    });

    it('should return true if the input contains a space between letters', function() {
      expect(scope.containsOnlyLetters('new york')).toEqual(true);
    });

    it('should return false if the input contains numbers', function() {
      expect(scope.containsOnlyLetters('n0rwalk')).toEqual(false);
    });

    it('should return false if the input contains a special characters', function() {
      expect(scope.containsOnlyLetters('new-york')).toEqual(false);
    });
  });

  describe('isInputValid', function() {
    it('should alert an error if the city and state are both empty', function() {
      spyOn(window, 'alert');
      scope.isInputValid('', '');
      expect(window.alert).toHaveBeenCalledWith('Please enter a city or state.');
    });

    it('should alert an error containsOnlyLetters returns false for city or state', function() {
      spyOn(window, 'alert').and.returnValue(false);
      scope.isInputValid('norwalk2', 'ct');
      expect(window.alert).toHaveBeenCalledWith('Input values cannot contain numbers or special characters.');
    });

    it('should return true if input values are valid', function() {
      expect(scope.isInputValid('miami', 'fl')).toEqual(true);
    })
  });

  describe('getWeatherData', function() {
    it('should set fetchInProgress to true', function() {
      scope.getWeatherData('norwalk');
      expect(scope.fetchInProgress).toEqual(true);
    });

    it('should not send a request if isInputValid returns false', function() {
      spyOn(scope, 'isInputValid').and.returnValue(false);
      spyOn(weatherRequestor, 'getCurrentWeather');
      scope.getWeatherData('', '');
      expect(weatherRequestor.getCurrentWeather).not.toHaveBeenCalled();
    });

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

      it('should set fetchInProgress to false', function() {
        scope.getWeatherData('norwalk');
        $rootScope.$digest();
        expect(scope.fetchInProgress).toEqual(false);
      });
    });

    describe('on error', function() {
      it('should alert a generic message if the error field is not present on error', function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.reject({error_code: '404'}));
        spyOn(window, 'alert');
        scope.getWeatherData('norwalk', 'ct');
        $rootScope.$digest();
        expect(window.alert).toHaveBeenCalledWith('There was an error requesting the data.');
      });

      it('should alert the message on error', function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.reject({cod: '404', message: 'Error: Not found city'}));
        spyOn(window, 'alert');
        scope.getWeatherData('q');
        $rootScope.$digest();
        expect(window.alert).toHaveBeenCalledWith('Error: Not found city');
      });

      it('should set fetchInProgress to false', function() {
        spyOn(weatherRequestor, 'getCurrentWeather').and.returnValue($q.reject({cod: '404', message: 'Error: Not found city'}));
        scope.getWeatherData('q');
        $rootScope.$digest();
        expect(scope.fetchInProgress).toEqual(false);
      });
    });
  });
});

