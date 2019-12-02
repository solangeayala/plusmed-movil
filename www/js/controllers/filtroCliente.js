app.controller('filtroClienteCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, reservasService, UtilFactory) {
    $scope.datos = {};
    $scope.flagCliente = false;
    $localStorage.flagClienteFiltro = true;
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

    if ($localStorage.pacienteSeleccion2) {
        console.log('PACIENTE seleccionado');
        $scope.flagCliente = true;
        $scope.cliente = $localStorage.pacienteSeleccion2;
        $scope.filtro.idCliente = {
            "idPersona": $scope.cliente.idPersona
        };
        $localStorage.auxcliente = $scope.cliente;
        delete $localStorage.pacienteSeleccion2;
    }

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

    $scope.filtrar = function() {
        console.log($scope.filtro);
        $ionicLoading.show();
        reservasService.filtroReservas($scope.filtro)
            .then(function(response) {
                    if (response.status == 200) {
                        $localStorage.reservasFiltro = response.data.lista;
                        $state.go('menu.turnos');
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

});