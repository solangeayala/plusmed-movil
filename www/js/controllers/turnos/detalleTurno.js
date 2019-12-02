app.controller('detalleTurnoCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, $window, pacienteService, reservasService, UtilFactory) {

    $scope.turno = $localStorage.detalleReserva;

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

    $('#hideshowTurnos').on('click', function(event) {
        $('#card-filtroTurnos').toggle('show');
    });

    $scope.cancelar = function() {
        $ionicLoading.show();
        reservasService.cancelarReserva($scope.turno.idReserva)
            .then(function(response) {
                    if (response.status == 200) {
                        UtilFactory.aceptar('Operación exitosa', 'Se ha eliminado la reserva');

                        $state.go('menu.turnos');
                        console.log(response);
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


    $scope.marcarAsistencia = function() {
        var param = {
            "idReserva": $scope.turno.idReserva,
            "observacion": "El paciente ya asistio a la consulta",
            "flagAsistio": "S"
        };
        $ionicLoading.show();
        reservasService.marcarReserva(param)
            .then(function(response) {
                    if (response.status == 200) {
                        UtilFactory.aceptar('Operación exitosa', 'Se ha marcado como asistida la reserva');
                        $window.location.reload(true);
                        console.log(response);
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
})