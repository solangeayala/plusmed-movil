app.controller('extractoFijoCtrl', ['$scope', 'UtilFactory',
    '$state', '$stateParams', '$localStorage', '$ionicLoading', 'ionicDatePicker', '$filter',
    'movimientoService',
    function($scope, UtilFactory, $state, $stateParams,
        $localStorage, $ionicLoading, ionicDatePicker, $filter, movimientoService) {

        $scope.options = {
            pagination: false,
        };

        $scope.extractoFijo = [];
        $scope.selected = {};
        $scope.selected.ahorroPlazoFijo = $localStorage.extractoFijo;

        var json = {
            "tipo": 'PF_DOCUMENTOS',
            "nroCuenta": $scope.selected.ahorroPlazoFijo.numero,
            "mes": "10",
            "anho": "1912",
            "idMoneda": $scope.selected.ahorroPlazoFijo.idMoneda
        };

        $ionicLoading.show();
        movimientoService.movimientoCuenta(json)
            .then(function(response) {
                console.log(response.data.dato);
                if (response.data.estado === 0) {
                    $scope.documentos = response.data.dato;
                    $scope.documentos.push({
                        'numero': 'TODOS'
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
                "tipo": 'PLAZO_FIJO',
                "nroCuenta": $scope.selected.ahorroPlazoFijo.numero,
                "mes": '2019',
                "anho": '01',
                "idMoneda": $scope.selected.ahorroPlazoFijo.idMoneda
            };

            if ($scope.selected.documento && $scope.selected.documento.numero != 'TODOS') {
                cuenta.nroDocumento = $scope.selected.documento.numero;

            }

            $ionicLoading.show();
            movimientoService.movimientoCuenta(cuenta)
                .then(function(response) {
                    console.log(response.data.dato);
                    if (response.data.estado === 0) {
                        $scope.extractoFijo = response.data.dato;
                    } else {
                        delete $scope.extractoFijo;
                        console.log('Registros inexistentes');
                    }
                    $ionicLoading.hide();
                }, function(response) {
                    console.log('Ha ocurrido un error, intente nuevamente', 'Atención');
                    $ionicLoading.hide();
                });
        };

        $scope.update = function() {
            $scope.documentosSeleccionados = [];
            if ($scope.selected.documento && $scope.selected.documento.numero != 'TODOS') {
                $scope.documentosSeleccionados.push($scope.selected.documento);
            } else {
                $scope.documentosSeleccionados = $scope.documentos;
            }

            $scope.cargarTabla();
        };

    }
]);