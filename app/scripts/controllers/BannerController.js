'use strict';

angular.module('pietraiajsApp')

  .controller('BannerController', ['$scope', 'RsResource', function ($scope, RsResource) {

    $scope.banners = {};
    var reqParams = {};
    reqParams['host'] = 'localhost:8080';
    reqParams['entityType'] = 'banners';
    reqParams['startRow'] = 0;
    reqParams['pageSize'] = 3;


    RsResource.query(reqParams, function (data) {
      $scope.banners = data;
    });

  }]);
