(function() {
  function State() {
    return {
      params: {},
      go: angular.noop,
      current: {
        name: 'weather',
      },
      $current: {
        name: 'weather',
        self: {
          name: 'weather'
        },
        route: {
          name: 'weather',
        },
        parent: {
          self: {
            name: 'weatherParent'
          },
          route: {
            name: 'weatherParent',
            state: 'default.home'
          }
        }
      }
    };
  }

  angular.module('weatherApp.mocks.$state', []).factory('$state', State);
}());
