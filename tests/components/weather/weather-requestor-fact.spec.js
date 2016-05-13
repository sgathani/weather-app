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
    describe('general and success cases', function() {
      beforeEach(function() {
        spyOn(systemUnderTest, 'sendRequest').and.returnValue($q.when({data: weatherData}));
      });

      it('should call _getQuery to build the search query', function() {
        spyOn(systemUnderTest, '_getQuery');
        systemUnderTest.getCurrentWeather('dublin', 'ca');

        expect(systemUnderTest._getQuery).toHaveBeenCalledWith('dublin', 'ca');
      });

      it('should call sendRequest to get weather data', function() {
        systemUnderTest.getCurrentWeather('new york', 'ny');
        expect(systemUnderTest.sendRequest).toHaveBeenCalledWith('new york,ny');
      });

      it('should call _getFormattedResponse on success', function() {
        spyOn(systemUnderTest, '_getFormattedResponse');
        systemUnderTest.getCurrentWeather('new york', 'ny');
        $rootScope.$digest();

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
      });
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
    it('should reject the response code != 200 to signals an error', function() {
      var errorResponse = {data: {cod: 404}};
      spyOn($q, 'reject');
      systemUnderTest._getFormattedResponse(errorResponse);
      expect($q.reject).toHaveBeenCalledWith(errorResponse.data);
    });

    it('should not reject the promise if the response code is 200', function() {
      var response = {data: weatherData};
      spyOn($q, 'reject');
      systemUnderTest._getFormattedResponse(response);
      expect($q.reject).not.toHaveBeenCalledWith(response.data);
    });

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
