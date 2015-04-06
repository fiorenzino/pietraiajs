'use strict';

angular.module('pietraiajsApp')

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider

      .state('app.libero', {
        url: ':id',
        views: {
          'content@': {
            templateUrl: function ($stateParams) {
              if ($stateParams.id) {
                return 'views/libero/' + $stateParams.id + '.html';
              } else {
                return 'views/home.html';
              }

            }
          }
        }
      })
  }]);
