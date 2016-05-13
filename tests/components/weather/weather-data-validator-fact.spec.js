describe('Service: weatherDataValidator', function() {
  beforeEach(module(
    'weatherApp'
  ));

  var systemUnderTest;

  beforeEach(inject(function(weatherDataValidator) {
    systemUnderTest = weatherDataValidator;
  }));

  describe('_containsOnlyLetters', function() {
    it('should return true of the input contains only letters', function() {
      expect(systemUnderTest._containsOnlyLetters('norwalk')).toEqual(true);
    });

    it('should return true if the input contains a space between letters', function() {
      expect(systemUnderTest._containsOnlyLetters('new york')).toEqual(true);
    });

    it('should return false if the input contains numbers', function() {
      expect(systemUnderTest._containsOnlyLetters('n0rwalk')).toEqual(false);
    });

    it('should return false if the input contains a special characters', function() {
      expect(systemUnderTest._containsOnlyLetters('new-york')).toEqual(false);
    });
  });

  describe('isValid', function() {
    it('should alert an error if the city and state are both empty', function() {
      spyOn(window, 'alert');
      systemUnderTest.isValid('', '');
      expect(window.alert).toHaveBeenCalledWith('Please enter a city or state.');
    });

    it('should alert an error containsOnlyLetters returns false for city or state', function() {
      spyOn(window, 'alert').and.returnValue(false);
      systemUnderTest.isValid('norwalk2', 'ct');
      expect(window.alert).toHaveBeenCalledWith('Input values cannot contain numbers or special characters.');
    });

    it('should return true if input values are valid', function() {
      expect(systemUnderTest.isValid('miami', 'fl')).toEqual(true);
    })
  });

});
