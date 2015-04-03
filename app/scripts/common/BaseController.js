'use strict';

function BaseController($scope, $stateParams, $state, Service, popupService, NgTableParams, $location) {
  var editId = -1;


  $scope.init = function () {
    if ($stateParams.id !== undefined) {
      $scope.element = Service.get({host: $scope.host, id: $stateParams.id, entityType: $scope.entityType});
    } else {
      $scope.element = {};
    }
  }

  $scope.getBaseSearch = function (search, reqParams) {

  }

  $scope.init();

  $scope.tableParams = new NgTableParams(
    angular.extend({
        page: 1,            // show first page
        count: 10
        //,           // count per page
        //sorting: $scope.sortingArray //nome: 'desc' // initial sorting

      }
      ,
      $location.search()),

    {
      getData: function ($defer, params) {

        var reqParams = {'startRow': (params.page() - 1) * params.count(), 'pageSize': params.count()};
        if (angular.isDefined(params.$params['sorting'])) {
          angular.forEach(params.$params['sorting'], function (value, key) {
            reqParams['orderBy'] = key + ' ' + value;
          });
        }
        $scope.getBaseSearch($scope.search, reqParams);
        reqParams['entityType'] = $scope.entityType;
        reqParams['host'] = $scope.host;
        Service.query(reqParams, function (data, getResponseHeaders) {
          params.total(getResponseHeaders('listSize'));
          $defer.resolve(data);
        });
        $location.search(params.url()); // put params in url
      }
    })
  ;

  $scope.reload = function () {
    $scope.tableParams.reload();
  }

  $scope.resetSearch = function () {
    $scope.search = {};
    $scope.tableParams.reload();
  }

  $scope.addNew = function () {
    $scope.element = {};
    $state.go(newPage);
  }


  $scope.save = function () {
    Service.create({host: $scope.host, entityType: actualEntityType}, $scope.element, function () {
      $scope.element = {};
      $state.go(listPage);
    });

  }

  $scope.update = function () {
    //$scope.element.$update(function () {
    //  $scope.tableParams.reload();
    //});
    Service.update({host: $scope.host, entityType: actualEntityType}, $scope.element, function () {
      $state.go(listPage);
    });
  }

  $scope.updateInLine = function (inLine) {
    Service.update({host: $scope.host, entityType: actualEntityType}, inLine, function () {
      $scope.tableParams.reload();
    });
    //opzione.$update(function () {
    //  $scope.tableParams.reload();
    //});
  }

  $scope.delete = function () {
    if (popupService.showPopup('Vuoi eliminarlo?')) {
      //$scope.element.$delete(function () {
      //  $state.go(listPage);
      //});
      Service.delete({host: $scope.host, entityType: actualEntityType}, $scope.element, function () {
        $state.go(listPage);
      });
    }
  }

  $scope.deleteInLine = function (inLine) {
    if (popupService.showPopup('Vuoi eliminarlo?')) {
      //opzione.$delete(function () {
      //  $scope.tableParams.reload();
      //});
      Service.delete({host: $scope.host, entityType: actualEntityType}, inLine, function () {
        $scope.tableParams.reload();
      });
    }
  }

  $scope.undo = function () {
    $scope.element = {};
    $scope.search = {};
    $state.go(listPage);
  }


  $scope.reset = function () {
    $scope.element = {};
    $scope.search = {};
    $scope.tableParams.reload();
  }


  $scope.setEditId = function (pid) {
    $scope.editId = pid;
    $scope.tableParams.reload();
  }

}
