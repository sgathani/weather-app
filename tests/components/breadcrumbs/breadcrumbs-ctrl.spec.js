describe('Controller: breadcrumbsCtrl', function() {
  beforeEach(module('weatherApp',
  'weatherApp.mocks.breadcrumbGenerator'));

  var systemUnderTest,
    breadcrumbGenerator,
    $rootScope;
  var $scope;

  beforeEach(inject(function(_$rootScope_, $controller, _breadcrumbGenerator_) {
    $rootScope = _$rootScope_;
    breadcrumbGenerator = _breadcrumbGenerator_;

    $scope  = $rootScope.$new();
    systemUnderTest = $controller('breadcrumbsCtrl', {
      $scope: $scope
    });

    $rootScope.$apply();
  }));

  it('should populate $scope.breadcrumbs on init', function() {
    expect(systemUnderTest.breadcrumbs).toBeDefined();
  });

  it('should call _populateBreadcrumbs on the $stateChangeSuccess event on $rootScope', function() {
    spyOn(systemUnderTest, '_populateBreadcrumbs');
    $rootScope.$emit('$stateChangeSuccess');
    $rootScope.$digest();
    expect(systemUnderTest._populateBreadcrumbs).toHaveBeenCalled();
  });

  describe('_populateBreadcrumbs', function() {
    beforeEach(function() {
      spyOn(breadcrumbGenerator, 'getBreadcrumbs').and.returnValue(['a']);
    });

    it('should call breadCrumbGenerator.getBreadcrumbs', function() {
      systemUnderTest._populateBreadcrumbs();
      expect(breadcrumbGenerator.getBreadcrumbs).toHaveBeenCalled();
    });

    it('should put the breadcrumbs on scope', function() {
      systemUnderTest._populateBreadcrumbs();
      expect(systemUnderTest.breadcrumbs).toEqual(['a']);
    });
  });
});

