app.controller('reservasPacienteCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, reservasService, pacienteService, UtilFactory) {

    $scope.paciente = $localStorage.pacienteVerReservas;

    $scope.obtenerReservasPaciente = function() {
        $ionicLoading.show();
        reservasService.getReservasPaciente($scope.paciente)
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
    };

    $scope.obtenerReservasPaciente();

});