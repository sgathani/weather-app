/// <reference path="../typings/browser.d.ts" />
var Puma;
(function (Puma) {
    var dependencies = [
        'ui.router',
        'thief',
        'slickgrid',
        'fds-interaction',
        'pa3.optionsDialog',
        'pa3.services',
        'pa3.optionsDialog.idLookup',
        'pa3.services.paFormulaLookup',
        'pa3.services.idLookupServices',
        'pa3.services.accountServices',
        'pascalprecht.translate'
    ];
    var app = angular.module('pumaFrontend', dependencies);
    var MyConfig = (function () {
        function MyConfig($stateProvider, $urlRouterProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;
            this.init();
        }
        MyConfig.prototype.init = function () {
            this.$stateProvider.state('main', {
                abstract: true,
                template: '<app-container class="full-height"></app-container>'
            });
            this.$stateProvider.state('main.singlePage', {
                url: '/document/doc1.puma',
                views: {
                    toolbar: {
                        template: '<single-page-toolbar></single-page-toolbar>'
                    },
                    lhp: {
                        template: '<document-lhp></document-lhp>'
                    },
                    content: {
                        template: '<single-document></single-document>'
                    }
                }
            });
            this.$stateProvider.state('main.singlePage.component', {
                url: '/component',
                params: {
                    asset: null
                },
                views: {
                    'content@main': {
                        template: '<slim-preview></slim-preview>'
                    }
                }
            });
            this.$stateProvider.state('main.about', {
                templateUrl: 'components/about.html',
                url: '/about'
            });
            this.$stateProvider.state('main.dashboard', {
                url: '/dashboard',
                views: {
                    toolbar: {
                        template: '<single-page-toolbar></single-page-toolbar>'
                    },
                    lhp: {
                        template: '<single-page-lhp></single-page-lhp>'
                    },
                    content: {
                        template: '<dashboard></dashboard>'
                    }
                }
            });
            this.$urlRouterProvider.otherwise('/document/doc1.puma');
        };
        return MyConfig;
    }());
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            return new MyConfig($stateProvider, $urlRouterProvider);
        }]);
})(Puma || (Puma = {}));

//# sourceMappingURL=app.js.map
