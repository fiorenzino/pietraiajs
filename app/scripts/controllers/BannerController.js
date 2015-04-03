'use strict';

angular.module('pietraiajsApp')

  .controller('BannerController', ['$scope', '$stateParams', '$state', 'RsResource', 'popupService', 'NgTableParams', '$filter',
    function ($scope, $stateParams, $state, RsResource, popupService, NgTableParams, $filter) {


      $scope.host = 'localhost:8080';
      $scope.entityType = 'banner';
      $scope.sortingArray = {id: 'desc'};

      angular.extend(this, new BaseController($scope, $stateParams, $state, RsResource, popupService, NgTableParams));


      $scope.getBaseSearch = function (search, reqParams) {

      }

      $scope.init = function () {

      }
    }]);
