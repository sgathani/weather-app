(function() {
  function leftHandPane() {
    return {
      restrict: 'E',
      templateUrl: 'components/lhp/left-hand-pane.html',
      controller: 'leftHandPaneCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      scope: {
        hideLhp: '='
      },
    };
  }

  angular.module('weatherApp').directive('leftHandPane', leftHandPane);
}());
