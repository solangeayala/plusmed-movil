app.controller('turnosCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, pacienteService, reservasService, UtilFactory) {

    $scope.filtro = {};
    $scope.filtro.fechas = {};

    var today = new Date();
    $scope.trx = {};
    $scope.trx.fechaDesde = new Date(today.getFullYear(), today.getMonth(), 1);
    $scope.trx.fechaHasta = new Date();

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

        var fecha = yyyy + '' + mm + '' + dd;
        $scope.filtro.fechas.fechaDesdeCadena = fecha;
        console.log(fecha);
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

        var fecha = yyyy + '' + mm + '' + dd;
        $scope.filtro.fechas.fechaHastaCadena = fecha;
        console.log(fecha);
        flagDesde = true;
    };

    $scope.verDetalles = function(ficha) {
        $localStorage.fichaDetalle = ficha;
        $state.go('menu.detalle-ficha');
    };

    $scope.obtenerReservas = function() {
        $ionicLoading.show();
        if ($localStorage.reservasFiltro != null) {
            $scope.reservas = $localStorage.reservasFiltro;
            delete $localStorage.reservasFiltro;
            $ionicLoading.hide();
        } else {
            reservasService.getReservas()
                .then(function(response) {
                        if (response.status == 200) {
                            $scope.reservas = response.data.lista;
                            console.log(response);
                        } else {
                            UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                        }
                        $ionicLoading.hide();
                    },
                    function(response) {
                        UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                        $ionicLoading.hide();
                    });
        }

    };

    $scope.obtenerReservas();

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

    $scope.verFechas = function() {
        $scope.modal.hide();
        $scope.formatearFechaDesde();
        $scope.formatearFechaHasta();
    };

    $('#hideshow').on('click', function(event) {
        $('#card-filtro').toggle('show');
    });

    $scope.filtrar = function() {
        console.log($scope.filtro);
        $ionicLoading.show();
        reservasService.filtroReservas($scope.filtro)
            .then(function(response) {
                    if (response.status == 200) {
                        $scope.reservas = response.data.lista;
                        console.log(response);
                    } else {
                        UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                    }
                    $ionicLoading.hide();
                },
                function(response) {
                    UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                    $ionicLoading.hide();
                });
        $scope.filtro = {};
    };

    $scope.porFisio = function() {
        $localStorage.flagReservaFiltro = true;
        $state.go('menu.filtro-fisio');
    }
})