'use strict';

function NewsController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
  angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, this));

  $scope.listPage = 'app.news';
  $scope.newPage = 'app.news_new';
  $scope.entityType = 'news';
  $scope.sortingArray = {data: 'desc'};

  $scope.getBaseSearch = function (search, reqParams) {
    if (search && search.obj && search.obj.oggetto) {
      console.log('oggetto: ' + search.obj.oggetto);
      reqParams['obj.oggetto'] = search.obj.oggetto;
    }
    reqParams['obj.tipo'] = 6;
  }

};

angular.module('pietraiajsApp')

  .controller('NewsController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
      angular.extend(this, new NewsController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location));
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.news', {
        url: '/news',
        views: {
          'content@': {
            templateUrl: 'views/news/list.html',
            controller: 'NewsController'
          }
        },
        data: {
          sectionTitle: 'Notizie',
          sectionSubtitle: 'La pietraia prende vita...',
          sectionPath: ['news']
        }
      })

      .state('app.news_view', {
        url: '/news/:id',
        views: {
          'content@': {
            templateUrl: 'views/news/view.html',
            controller: 'NewsController'
          }
        },
        data: {
          sectionTitle: 'Notizie',
          sectionSubtitle: 'La pietraia prende vita...',
          sectionPath: ['news']
        }
      })
  }])

;
