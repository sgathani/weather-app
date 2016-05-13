describe('Controller: lhpTabCtrl', function() {
  beforeEach(module('weatherApp',
  'weatherApp.mocks.$state'));

  var systemUnderTest,
    $rootScope,
    $state;

  beforeEach(inject(function(_$rootScope_, _$state_, $controller) {
    $rootScope = _$rootScope_;
    $state = _$state_;
    var scope = $rootScope.$new();
    var data = {title: 'newTitle'};

    systemUnderTest = $controller('lhpTabCtrl', {
      $scope: scope
    }, data);

    $rootScope.$apply();
  }));

  describe('goToRoute', function() {
    it('should call $state.go with the given routeName', function() {
      spyOn($state, 'go');
      systemUnderTest.goToRoute('home');
      expect($state.go).toHaveBeenCalledTimes(1);
      expect($state.go).toHaveBeenCalledWith('default.home');
    });

    it('should convert the route name to lowercase when calling $state.go', function() {
      spyOn($state, 'go');
      systemUnderTest.goToRoute('Home');
      expect($state.go).toHaveBeenCalledWith('default.home');
    });
  });
});

