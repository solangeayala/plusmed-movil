app.controller('nuevoTurnoCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, pacienteService, reservasService, UtilFactory) {
    $scope.datos = {};
    $scope.filtro = {};
    $scope.flagFicha = false;
    $scope.flagServ = false;
    $scope.flagFisio = false;
    $localStorage.flagFiltro = false;

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
        $scope.datos.fechaCadena = fecha;
        console.log(fecha);
        flagDesde = true;
    };

    if ($localStorage.auxpacienteTurno) {
        $scope.flagFicha = true;
        $scope.cliente = $localStorage.auxpacienteTurno;
        $scope.datos.idCliente = {
            "idPersona": $scope.cliente.idPersona
        };
        delete $localStorage.auxpacienteTurno;
    }

    if ($localStorage.pacienteSeleccionTurno) {
        console.log('PACIENTE seleccionado');
        $scope.flagFicha = true;
        $scope.cliente = $localStorage.pacienteSeleccionTurno;
        $scope.datos.idCliente = {
            "idPersona": $scope.cliente.idPersona
        };
        delete $localStorage.pacienteSeleccionTurno;
        $localStorage.auxpacienteTurno = $scope.cliente;
    }

    if ($localStorage.fisioSeleccionTurno) {
        console.log('SERVICIO seleccionado');
        $scope.flagFisio = true;
        $scope.fisio = $localStorage.fisioSeleccionTurno;
        $scope.datos.idEmpleado = {
            "idPersona": $scope.fisio.idPersona
        };
        $localStorage.auxfisio = $scope.fisio;
        delete $localStorage.fisioSeleccionTurno;
    }

    $ionicModal.fromTemplateUrl('templates/modal-fecha-unica.html', function($ionicModal) {
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

    $scope.verFecha = function() {
        $scope.modal.hide();
        $scope.formatearFechaDesde();
        console.log($scope.datos);
        $ionicLoading.show();
        pacienteService.getHorariosFisio($scope.datos)
            .then(function(response) {
                    if (response.status == 200) {
                        console.log(response);
                        $scope.horarios = response.data;
                    } else {
                        UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                    }
                    $ionicLoading.hide();
                },
                function(response) {
                    UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                    $ionicLoading.hide();
                });
    };

    $scope.nuevaReserva = function() {
        console.log($scope.datos);
        delete $localStorage.auxservicio;
        delete $localStorage.auxpaciente;
        delete $localStorage.auxfisio;
        $ionicLoading.show();
        reservasService.nuevaReserva($scope.datos)
            .then(function(response) {
                    if (response.status == 200) {
                        console.log(response);
                        UtilFactory.aceptar('Nueva ficha añadida exitosamente', '');
                        $state.go('menu.turnos');
                    } else {
                        UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                    }
                    $ionicLoading.hide();
                },
                function(response) {
                    UtilFactory.aceptar(response.data);
                    $ionicLoading.hide();
                });
    };

});