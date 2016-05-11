angular.module('weatherApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'components/home/home.html'
            })
            .state('weather', {
                url: '/weather',
                templateUrl: 'components/weather/weather.html',
                controller: 'weatherDataCtrl'
            });
    }]);
