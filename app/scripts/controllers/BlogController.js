'use strict';

function BlogController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
  angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $location, this));

  $scope.listPage = 'app.blog';
  $scope.newPage = 'app.blog_new';
  $scope.entityType = 'news';
  $scope.sortingArray = {data: 'desc'};

  $scope.getBaseSearch = function (search, reqParams) {
    if (search && search.obj && search.obj.oggetto) {
      console.log('oggetto: ' + search.obj.oggetto);
      reqParams['obj.oggetto'] = search.obj.oggetto;
    }
    reqParams['obj.tipo'] = 10;
  }

};

angular.module('pietraiajsApp')

  .controller('BlogController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter', '$location',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location) {
      angular.extend(this, new NewsController($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter, $location));
      $scope.init();
    }])

  .config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('app.blog', {
        url: '/blog',
        views: {
          'content@': {
            templateUrl: 'views/blog/list.html',
            controller: 'BlogController'
          }
        },
        data: {
          sectionTitle: 'Pietraia Live',
          sectionSubtitle: 'blog blog.',
          sectionPath: ['blog']
        }
      })

      .state('app.news_view', {
        url: '/blog/:id',
        views: {
          'content@': {
            controller: 'BlogController',
            templateUrl: 'views/blog/view.html'
          }
        }
      })
  }])

;
