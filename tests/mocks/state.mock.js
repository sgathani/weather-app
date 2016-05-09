(function() {
  function State() {
    return {
      params: {},
      go: angular.noop,
      current: {
        name: 'weather'
      }
    };
  }

  angular.module('weatherApp.mocks.$state', []).factory('$state', State);
}());
