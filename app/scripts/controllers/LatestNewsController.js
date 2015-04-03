'use strict';

angular.module('pietraiajsApp')

  .controller('LatestNewsController', ['$scope', 'RsResource', function ($scope, RsResource) {

    $scope.news = {};
    var reqParams = {};
    reqParams['host'] = 'localhost:8080';
    reqParams['entityType'] = 'news';
    reqParams['obj.tipo'] = 6;
    reqParams['startRow'] = 0;
    reqParams['pageSize'] = 3;


    RsResource.query(reqParams, function (data) {
      $scope.news = data;
    });

  }]);
