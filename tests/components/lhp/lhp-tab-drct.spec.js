describe('Directive:lhpTab', function() {
  beforeEach(module('weatherApp',
  'weatherApp.mocks.$state'));

  var scope,
    element,
    isolateScope,
    $state;

  beforeEach(inject(function($rootScope, $compile, _$state_) {
    scope = $rootScope.$new();
    scope.title = 'newTitle';
    $state = _$state_;

    element = angular.element('<lhp-tab title="title"></lhp-tab>');
    element = $compile(element)(scope);
    scope.$apply();
    isolateScope = element.isolateScope();
  }));

  describe('goToRoute', function() {
    it('should call $state.go with the given routeName', function() {
      spyOn($state, 'go');
      isolateScope.goToRoute('home');
      expect($state.go).toHaveBeenCalledTimes(1);
      expect($state.go).toHaveBeenCalledWith('home');
    });

    it('should convert the route name to lowercase when calling $state.go', function() {
      spyOn($state, 'go');
      isolateScope.goToRoute('Home');
      expect($state.go).toHaveBeenCalledWith('home');
    });
  });
});

