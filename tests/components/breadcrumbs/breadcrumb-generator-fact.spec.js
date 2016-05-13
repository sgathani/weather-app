describe('Service: breadcrumbGenerator', function() {
  beforeEach(module(
    'weatherApp',
    'weatherApp.mocks.$state'
  ));

  var systemUnderTest, $state;

  beforeEach(inject(function(breadcrumbGenerator, _$state_) {
    systemUnderTest = breadcrumbGenerator;
    $state = _$state_;
  }));

  describe('getBreadcrumbs', function() {
    it('should call _generateBreadcrumbs', function() {
      spyOn(systemUnderTest, '_generateBreadcrumbs');
      systemUnderTest.getBreadcrumbs();
      expect(systemUnderTest._generateBreadcrumbs).toHaveBeenCalled();
    });

    it('should pass the current scope to _generateBreadcrumbs', function() {
      spyOn(systemUnderTest, '_generateBreadcrumbs');
      systemUnderTest.getBreadcrumbs();
      expect(systemUnderTest._generateBreadcrumbs).toHaveBeenCalledWith($state.$current, []);
    });
  });

  describe('_generateBreadcrumbs', function() {
    it('should generate a list of routes by traversing the $state tree', function() {
      expect(systemUnderTest._generateBreadcrumbs($state.$current, [])).toEqual([
        {
          title: 'weatherParent',
          stateName: 'default.home'
        },
        {
          title: 'weather',
          stateName: 'weather'
        }
      ])
    });
  });
});
