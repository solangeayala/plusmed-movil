app.controller('chequesRechazadosCtrl', ['$scope', '$rootScope', 'UtilFactory',
    '$localStorage', '$ionicLoading', 'ionicDatePicker', '$filter',
    'movimientoService', '$ionicModal', '$ionicPlatform', '$ionicHistory',
    function($scope, $rootScope, UtilFactory, $localStorage,
        $ionicLoading, ionicDatePicker, $filter,
        movimientoService, $ionicModal, $ionicPlatform, $ionicHistory) {

        $scope.cheques = $localStorage.chequesRechazados;
        $scope.moneda = $localStorage.monedaCuenta;

    }
]);