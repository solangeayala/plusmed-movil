app.controller('fichaNuevaCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, pacienteService, UtilFactory) {
    $scope.datos = {};
    $scope.flagFicha = false;

    if ($localStorage.pacienteFichaNueva) {
        console.log('HAY PACIENTE PRESELECCIONADO');
        $scope.flagFicha = true;
        $scope.cliente = $localStorage.pacienteFichaNueva;
        $scope.datos.idCliente = $localStorage.pacienteFichaNueva.idPersona;
        delete $localStorage.pacienteFichaNueva;
    }

    if ($localStorage.pacienteSeleccion) {
        console.log('HAY PACIENTE PRESELECCIONADO');
        $scope.flagFicha = true;
        $scope.cliente = $localStorage.pacienteSeleccion;
        $scope.datos.idCliente = $localStorage.pacienteSeleccion.idPersona;
        delete $localStorage.pacienteSeleccion;
    }

    $scope.nuevaFicha = function() {
        console.log($scope.datos);
        $ionicLoading.show();
        pacienteService.nuevoPaciente($scope.datos)
            .then(function(response) {
                    if (response.status == 201) {
                        console.log(response);
                        UtilFactory.aceptar('Nuevo paciente añadido exitosamente', '');
                        $state.go('menu.pacientes');
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

});