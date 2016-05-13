(function() {
  function contentHeaderDrct() {
    return {
      restrict: 'E',
      templateUrl: 'components/content-header/content-header.html',
      controller: 'contentHeaderCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      scope: {
        hideLhp: '='
      }
    };
  }

  angular.module('weatherApp').directive('contentHeader', contentHeaderDrct);
}());
