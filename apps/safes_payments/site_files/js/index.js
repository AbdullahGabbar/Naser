app.controller("safes_payments", function ($scope, $http) {

  $scope.safe= {};
$scope.sourceList = [
  {name : 'amount in' , value : 'Amount In'},
  {name : 'amount out' , value : 'Amount Out'},
  {name : 'employee discount' , value : 'Employee Discount'},
  {name : 'employee offer' , value : 'Employee Offer'},
];

  $scope.loadEmployees = function () {
    $scope.busy = true;
    $http({
      method: "POST",
      url: "/api/employees/all",
      data: {
        select : {id:1 , name : 1}
      }
    }).then(
      function (response) {
        $scope.busy = false;
        if (response.data.done) {
          $scope.employees = response.data.list;
        }
      },
      function (err) {
        $scope.busy = false;
        $scope.error = err;
      }
      )
  };
  
  $scope.loadSafes = function () {
    $scope.list = {};
    $scope.busy = true;
    $http({
      method: "POST",
      url: "/api/safes/all",
      data: {}
    }).then(
      function (response) {
        $scope.busy = false;
        if (response.data.done) {
          $scope.safes = response.data.list;
        }
      },
      function (err) {
        $scope.busy = false;
        $scope.error = err;
      }
    )
  };
  
  $scope.loadAmountsInList = function (search) {
    $scope.busy = true;
    $http({
      method: "POST",
      url: "/api/safes_payments/all",
      data: {where : {search : search}}
    }).then(
      function (response) {
        $scope.busy = false;
        if (response.data.done) {
          $scope.total_in = 0;
          response.data.list.forEach(v => {
            $scope.total_in +=  parseFloat(v.value);
          });
          $scope.amountsInList = response.data.list;
        }
      },
      function (err) {
        $scope.busy = false;
        $scope.error = err;
      }
      )     
  };

                      
$scope.models=["Amount In", "Amount Out", "Employee Discount" , "Employee Offer"];

  $scope.loadAll = function (where) {
    $scope.list = {};
    $scope.busy = true;
    $http({
      method: "POST",
      url: "/api/safes_payments/all",
      data: {where : where}
    }).then(
      function (response) {
        $scope.busy = false;
        if (response.data.done) {
          
          $scope.list = response.data.list;
          site.hideModal('#safes_paymentsSearchModal'); 
        }
      },
      function (err) {
        $scope.busy = false;
        $scope.error = err;
      }
    )
  };


  $scope.searchAll = function () {
    let where = {};

    
    if ($scope.search.date) {
      where['date'] = $scope.search.date;
    }

    if ($scope.search.safe && $scope.search.safe.id) {
      where['safe.id'] = $scope.search.safe.id;
    }


    if ($scope.search.value) {
      where['value'] = site.toNumber($scope.search.value);
    }

    if ($scope.search.source) {
      where['source'] = $scope.search.source.value;
    }

    
    $scope.loadAll(where);
    
  };



 
  

  $scope.loadAll();
  // $scope.loadEmployees();
  $scope.loadSafes();

 
});
