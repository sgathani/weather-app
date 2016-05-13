describe('Controller: contentHeaderCtrl', function() {
  beforeEach(module('weatherApp',
    'weatherApp.mocks.$state'));

  var systemUnderTest,
    $rootScope,
    $state;

  beforeEach(inject(function(_$rootScope_, _$state_, $controller) {
    $rootScope = _$rootScope_;
    $state = _$state_;

    var scope = $rootScope.$new();
    var data = {hideLhp: false};

    systemUnderTest = $controller('contentHeaderCtrl', {
      $scope: scope
    }, data);

    $rootScope.$apply();
  }));

  it('should put $state on the scope', function() {
    expect(systemUnderTest.state).toBeDefined();
    expect(systemUnderTest.state).toEqual($state);
  });

  describe('toggleLhp', function() {
    it('should toggle the hideLhp value', function() {
      expect(systemUnderTest.hideLhp).toEqual(false);
      systemUnderTest.toggleLhp();
      expect(systemUnderTest.hideLhp).toEqual(true);
      systemUnderTest.toggleLhp();
      expect(systemUnderTest.hideLhp).toEqual(false);
    });
  });
});

