describe('Directive:contentHeader', function() {
  beforeEach(module('weatherApp',
  'weatherApp.mocks.$state'));

  var scope,
    element,
    isolateScope;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.hideLhp = false;

    element = angular.element('<content-header hide-lhp="hideLhp"></content-header>');
    element = $compile(element)(scope);
    scope.$apply();
    isolateScope = element.isolateScope();
  }));

  it('should put $state on the scope', function() {
    expect(isolateScope.state).toBeDefined();
    expect(isolateScope.state.current.name).toEqual('weather');
  });

  describe('toggleLhp', function() {
    it('should toggle the hideLhp value', function() {
      expect(isolateScope.hideLhp).toEqual(false);
      isolateScope.toggleLhp();
      expect(isolateScope.hideLhp).toEqual(true);
      isolateScope.toggleLhp();
      expect(isolateScope.hideLhp).toEqual(false);
    });
  });
});

