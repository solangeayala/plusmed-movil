app.controller('extractoAhorroCtrl', ['$scope', '$rootScope', 'UtilFactory',
    '$localStorage', '$ionicLoading', 'ionicDatePicker', '$filter',
    'movimientoService', '$ionicModal', '$ionicPlatform', '$ionicHistory',
    function($scope, $rootScope, UtilFactory, $localStorage, $ionicLoading,
        ionicDatePicker, $filter, movimientoService,
        $ionicModal, $ionicPlatform, $ionicHistory) {

        $scope.extractoAhorro = [];
        $scope.fechas = generarFechas();
        $scope.selected = {};
        $scope.selected.fecha = $scope.fechas[0];
        $scope.selected.ahorro = $localStorage.extractoAhorro;
        parametro = 'AHORRO';
        var flagDesde, flagHasta = false;
        var today = new Date();
        $scope.cuenta = {};
        $scope.trx = {};
        $scope.trx.fechaDesde = new Date(today.getFullYear(), today.getMonth(), 1);
        $scope.trx.fechaHasta = new Date();

        $ionicModal.fromTemplateUrl('templates/modal-fechas.html', function($ionicModal) {
            $scope.modal = $ionicModal;
            $rootScope.existeModal = $scope.modal;
        }, {
            scope: $scope,
            backdropClickToClose: true,
            animation: 'slide-in-up'
        });

        $scope.abrirModal = function() {
            $scope.modal.show();
        };

        $scope.cerrarModal = function() {
            $scope.cuenta = '';
            $scope.modal.hide();
        };

        $scope.formatearFechaDesde = function() {
            console.log($scope.trx.fechaDesde);
            var dd = $scope.trx.fechaDesde.getDate();
            var mm = $scope.trx.fechaDesde.getMonth() + 1; //January is 0!

            var yyyy = $scope.trx.fechaDesde.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            var fecha = dd + '/' + mm + '/' + yyyy;
            $scope.cuenta.fechaDesde = fecha;
            console.log($scope.cuenta.fechaDesde);
            flagDesde = true;
        };

        $scope.formatearFechaHasta = function() {
            console.log($scope.trx.fechaDesde);
            var dd = $scope.trx.fechaHasta.getDate();
            var mm = $scope.trx.fechaHasta.getMonth() + 1; //January is 0!

            var yyyy = $scope.trx.fechaHasta.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }

            var fecha = dd + '/' + mm + '/' + yyyy;
            $scope.cuenta.fechaHasta = fecha;
            console.log($scope.cuenta.fechaHasta);
            flagHasta = true;
        };

        $scope.cargarTabla = function() {

            $scope.formatearFechaDesde();
            $scope.formatearFechaHasta();

            if ((flagDesde && flagHasta) || flagDesde || flagHasta) {
                cuenta = {
                    "tipo": 'AHORRO',
                    "nroCuenta": $scope.selected.ahorro.numero,
                    "mes": getMesExtracto($scope.selected.fecha.mes),
                    "anho": getAnhoExtracto($scope.selected.fecha.mes),
                    "fechaInicio": $scope.cuenta.fechaDesde,
                    "fechaFin": $scope.cuenta.fechaHasta,
                    "idMoneda": $scope.selected.ahorro.idMoneda
                };

                $ionicLoading.show();
                movimientoService.movimientoCuenta(cuenta)
                    .then(function(response) {
                        console.log(response.data.dato);
                        if (response.data.estado === 0) {
                            $scope.extractoAhorro = response.data.dato;
                            if ($scope.modal) {
                                $scope.modal.hide();
                            }
                            flagDesde, flagHasta = false;
                        } else {
                            delete $scope.extractoAhorro;
                            console.log('Registros inexistentes');
                            if ($scope.modal) {
                                $scope.modal.hide();
                            }
                            flagDesde, flagHasta = false;
                        }
                        $ionicLoading.hide();
                    }, function(response) {
                        console.log('Ha ocurrido un error, intente nuevamente', 'Atención');
                        flagDesde, flagHasta = false;
                        $ionicLoading.hide();
                    });
            }

        };

        $scope.cargarTabla();

        $scope.update = function() {
            $scope.cargarTabla();
        };

        /*$ionicPlatform.registerBackButtonAction(function(e) {
            console.log($scope.modal.isShown());
            if ($scope.modal.isShown()) {
                e.preventDefault();
                $scope.modal.hide();
            } else {
                var $backView = $ionicHistory.backView();
                if ($backView) {
                    $backView.go();
                }
            }
        }, 1000);*/

    }
]);