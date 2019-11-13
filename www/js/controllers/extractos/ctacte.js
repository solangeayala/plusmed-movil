app.controller('extractoCtaCteCtrl', ['$scope', '$rootScope', 'UtilFactory',
    '$localStorage', '$ionicLoading', 'ionicDatePicker', '$filter',
    'movimientoService', '$ionicModal', '$ionicPlatform', '$ionicHistory', '$state',
    function($scope, $rootScope, UtilFactory, $localStorage,
        $ionicLoading, ionicDatePicker, $filter,
        movimientoService, $ionicModal, $ionicPlatform, $ionicHistory, $state) {

        $scope.extractoCtaCte;
        $scope.fechas = generarFechas();
        $scope.selected = {};
        $scope.selected.fecha = $scope.fechas[0];
        $scope.selected.ctacte = $localStorage.ctacte;
        parametro = 'CTACTE';
        var flagDesde, flagHasta = false;
        var today = new Date();
        $scope.cuenta = {};
        $scope.cheques = {};
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

                var cuenta = {
                    "tipo": 'CTACTE',
                    "nroCuenta": $scope.selected.ctacte.numero,
                    "mes": "01",
                    "anho": "2019",
                    "fechaInicio": $scope.cuenta.fechaDesde,
                    "fechaFin": $scope.cuenta.fechaHasta,
                    "idMoneda": $scope.selected.ctacte.idMoneda
                };

                $ionicLoading.show();
                movimientoService.movimientoCuenta(cuenta)
                    .then(function(response) {
                        if (response.data.estado === 0) {
                            console.log(response.data.dato);
                            $scope.extractoCtaCte = response.data.dato.movimientos;
                            $scope.cheques = response.data.dato.cheques;
                            $scope.extractoCtaCteConf = response.data.dato.movimientosConf;
                            if ($scope.modal) {
                                $scope.modal.hide();
                            }
                            flagDesde, flagHasta = false;
                        } else {
                            console.log('Registros inexistentes');
                            delete $scope.extractoCtaCte;
                            delete $scope.extractoCtaCteConf;
                            if ($scope.modal) {
                                $scope.modal.hide();
                            }
                            flagDesde, flagHasta = false;
                        }
                        $ionicLoading.hide();
                    }, function(response) {
                        console.log(response);
                        UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                        flagDesde, flagHasta = false;
                        $ionicLoading.hide();
                    });
            }

        };

        $scope.cargarTabla();

        $scope.update = function() {
            $scope.cargarTabla();
        };

        $scope.verCheques = function() {
            if ($scope.cheques.length > 0) {
                $localStorage.monedaCuenta = $scope.selected.ctacte.idMoneda;
                $localStorage.chequesRechazados = $scope.cheques;
                $state.go('menu.cheques-rechazados');
            } else {
                console.log('no existen cheques rechazados');
            }
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