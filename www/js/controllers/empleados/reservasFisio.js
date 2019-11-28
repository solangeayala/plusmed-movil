app.controller('reservasFisioCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, reservasService, pacienteService, UtilFactory) {

    $scope.fisio = $localStorage.fisioVerReservas;

    $scope.obtenerReservasFisio = function() {
        $ionicLoading.show();
        reservasService.getReservasFisio($scope.fisio)
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

    $scope.obtenerReservasFisio();

});