describe('Service: weatherRequestor', function() {
  beforeEach(module(
    'weatherApp',
    'weatherApp.mocks.weatherDataMock'
  ));

  var systemUnderTest,
    $httpBackend,
    $rootScope,
    $q,
    weatherConstants,
    validateUrl,
    weatherData;

  beforeEach(inject(function(_$q_, _$httpBackend_, _$rootScope_, weatherRequestor, _weatherConstants_, weatherDataMock) {
    systemUnderTest = weatherRequestor;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    weatherConstants = _weatherConstants_;
    weatherData = weatherDataMock.getData();

    validateUrl = function(url) {
      return url.indexOf(weatherConstants.openWeatherRequestUrl) >= 0 &&
        url.indexOf('appid') >=0 &&
        url.indexOf('units') >= 0 &&
        url.indexOf('q') >= 0;
    };

    $httpBackend.when('GET', validateUrl).respond(weatherData);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('getCurrentWeather', function() {
    it('should call sendRequest to get weather data', function() {
      spyOn(systemUnderTest, 'sendRequest').and.returnValue($q.when({data: weatherData}));
      systemUnderTest.getCurrentWeather('new york', 'ny');
      expect(systemUnderTest.sendRequest).toHaveBeenCalledWith('new york,ny');
    });

    it('should call _getFormattedResponse on success', function() {
      spyOn(systemUnderTest, '_getFormattedResponse');
      systemUnderTest.getCurrentWeather('new york', 'ny');
      $httpBackend.expectGET(validateUrl);
      $httpBackend.flush();

      expect(systemUnderTest._getFormattedResponse).toHaveBeenCalled();
    });

    it('should return weather data in the expected format to the consumer', function() {
      systemUnderTest.getCurrentWeather('new york', 'ny').then(function(data) {
        expect(data.currentWeather).toBeDefined();
        expect(data.lastReading).toBeDefined();
        expect(data.temperature).toBeDefined();
        expect(data.humidity).toBeDefined();
        expect(data.sunrise).toBeDefined();
        expect(data.sunset).toBeDefined();
      });

      $httpBackend.expectGET(validateUrl);
      $httpBackend.flush();
    });

    it('should reject the promise on error', function() {
      var errorMessage = 'Error fetching weather data';
      spyOn(systemUnderTest, 'sendRequest').and.returnValue($q.reject({error: errorMessage}));
      spyOn($q, 'reject');
      systemUnderTest.getCurrentWeather('new york', 'ny');
      $rootScope.$digest();
      expect($q.reject).toHaveBeenCalledWith({error: errorMessage});
    });
  });

  describe('sendRequest', function() {
    it('should get weather data from openWeatherAPI', function() {
      systemUnderTest.sendRequest('new york,ny');
      $httpBackend.expectGET(validateUrl);
      $httpBackend.flush();
    });

    it('should request the temperature in farheneit by setting the query param units to imperial', function() {
      systemUnderTest.sendRequest('new york,ny');

      function checkWeatherUnit(url) {
        return validateUrl(url) && url.indexOf('units=imperial') >=0;
      }

      $httpBackend.expectGET(checkWeatherUnit);
      $httpBackend.flush();
    });

    //TODO: check the other params as well
  });

  describe('_getQuery', function() {
    it('should only return the city is state is undefined', function() {
      expect(systemUnderTest._getQuery('miami')).toEqual('miami');
    });

    it('should only return the state if city is undefined', function() {
      expect(systemUnderTest._getQuery(undefined, 'florida')).toEqual('florida');
    });

    it('should return comma delimited string containing city and state if both are defined', function() {
      expect(systemUnderTest._getQuery('miami', 'florida')).toEqual('miami,florida');
    });
  });

  describe('_getFormattedResponse', function() {
    it('should return weather data in the expected format', function() {
      expect(systemUnderTest._getFormattedResponse({data: weatherData})).toEqual({
        currentWeather: weatherData.weather[0].description,
        lastReading: 'May 8, 2016',
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        sunrise: '05:40',
        sunset: '19:59'
      })
    });
  });
});
