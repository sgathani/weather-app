(function() {
  function leftHandPane() {
    return {
      restrict: 'E',
      templateUrl: 'components/lhp/left-hand-pane.html',
      scope: {
        hideLhp: '='
      }
    };
  }

  angular.module('weatherApp').directive('leftHandPane', leftHandPane);
}());
