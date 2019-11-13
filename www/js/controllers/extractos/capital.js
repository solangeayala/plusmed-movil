app.controller('extractoCapitalCtrl', ['$scope', 'UtilFactory',
    '$state', '$stateParams', '$localStorage', '$ionicLoading', 'ionicDatePicker', '$filter',
    'movimientoService',
    function($scope, UtilFactory, $state, $stateParams,
        $localStorage, $ionicLoading, ionicDatePicker, $filter, movimientoService) {

        $scope.extractoCapital = [];
        $scope.fechas = generarFechas();
        $scope.selected = {};
        $scope.selected.fecha = $scope.fechas[0];
        $scope.selected.capital = $localStorage.extractoCapital;

        $scope.cargarTabla = function() {
            cuenta = {
                "tipo": 'CAPITAL',
                "nroCuenta": $scope.selected.capital.numero,
                "mes": getMesExtracto($scope.selected.fecha.mes),
                "anho": getAnhoExtracto($scope.selected.fecha.mes),
                "idMoneda": $scope.selected.capital.idMoneda
            };

            $ionicLoading.show();
            movimientoService.movimientoCuenta(cuenta)
                .then(function(response) {
                    console.log(response.data);
                    if (response.data.estado === 0) {
                        $scope.extractoCapital = response.data.dato;
                    } else {
                        console.log('Registros inexistentes');
                        delete $scope.extractoCapital;
                    }
                    $ionicLoading.hide();
                }, function(response) {
                    console.log('Ha ocurrido un error, intente nuevamente', 'Atención');
                    $ionicLoading.hide();
                });
        };

        $scope.cargarTabla();

        $scope.update = function() {
            $scope.cargarTabla();
        };

    }
]);