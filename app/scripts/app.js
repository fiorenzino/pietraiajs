'use strict';

/**
 * @ngdoc overview
 * @name pietraiajsApp
 * @description
 * # pietraiajsApp
 *
 * Main module of the application.
 */
angular
  .module('pietraiajsApp', ['ngResource', 'ui.router', 'ngTable', 'ui.bootstrap', 'ngSanitize'])

  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })

  .service('popupService', function ($window) {
    this.showPopup = function (message) {
      return $window.confirm(message);
    }
  })

  .filter('newlines', function () {
    return function (text) {
      if (text)
        return text.replace(/\n/g, '<br/>');
      return '';
    }
  })

  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'templates/header.html'
          },
          'content': {
            templateUrl: 'views/benvenuto.html'
          },
          'footer': {
            templateUrl: 'templates/footer.html'
          }
        }
      })




  }]);
