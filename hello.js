angular.module('demo', [])
    .controller('Hello', function($scope, $http) {
        $http.get('http://localhost:8080/greeting?name=Feri')
        .then(function(response) {
            $scope.greeting = response.data;
        });
    });