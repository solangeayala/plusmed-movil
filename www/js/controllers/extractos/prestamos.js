app.controller('extractoPrestamoCtrl', ['$scope', 'UtilFactory',
    '$state', '$stateParams', '$localStorage', '$ionicLoading', 'ionicDatePicker', '$filter',
    'movimientoService',
    function($scope, UtilFactory, $state, $stateParams,
        $localStorage, $ionicLoading, ionicDatePicker, $filter, movimientoService) {

        $scope.options = {
            pagination: false,
        };

        $scope.extractoPrestamo = [];
        $scope.fechas = generarFechas();
        $scope.selected = {};
        $scope.selected.fecha = $scope.fechas[0];
        $scope.selected.prestamo = $localStorage.extractoPrestamo;

        var json = {
            "tipo": 'CREDITO_PAGARE',
            "nroCuenta": $scope.selected.prestamo.numero,
            "mes": "10",
            "anho": "1912",
            "idMoneda": $scope.selected.prestamo.idMoneda
        };

        $ionicLoading.show();
        movimientoService.movimientoCuenta(json)
            .then(function(response) {
                console.log(response.data.dato);
                if (response.data.estado === 0) {
                    $scope.pagares = response.data.dato;
                    $scope.pagares.push({
                        'nroPagare': 'TODOS'
                    });
                } else {
                    console.log('Registros inexistentes');
                }
                $ionicLoading.hide();
            }, function(response) {
                console.log('Ha ocurrido un error, intente nuevamente', 'Atención');
                $ionicLoading.hide();
            });



        $scope.cargarTabla = function() {

            var cuenta = {
                "tipo": 'CREDITO',
                "nroCuenta": $scope.selected.prestamo.numero,
                "mes": getMesExtracto($scope.selected.fecha.mes),
                "anho": getAnhoExtracto($scope.selected.fecha.mes),
                "idMoneda": $scope.selected.prestamo.idMoneda
            };
            if ($scope.selected.pagare.nroPagare != 'TODOS') {
                cuenta.pagare = $scope.selected.pagare.nroPagare;
            }

            $ionicLoading.show();
            movimientoService.movimientoCuenta(cuenta)
                .then(function(response) {
                    console.log(response.data.dato);
                    if (response.data.estado === 0) {
                        $scope.extractoPrestamo = response.data.dato;
                        console.log($scope.extractoPrestamo);
                    } else {
                        console.log('Registros inexistentes');
                        delete $scope.extractoPrestamo;
                    }
                    $ionicLoading.hide();
                }, function(response) {
                    console.log('Ha ocurrido un error, intente nuevamente', 'Atención');
                    $ionicLoading.hide();
                });
        };

        //        $scope.cargarTabla();

        $scope.update = function() {
            $scope.pagaresSeleccionados = [];
            if ($scope.selected.pagare.nroPagare != 'TODOS') {
                $scope.pagaresSeleccionados.push($scope.selected.pagare);
            } else {
                $scope.pagaresSeleccionados = $scope.pagares;
            }

            $scope.cargarTabla();
        };

    }
]);