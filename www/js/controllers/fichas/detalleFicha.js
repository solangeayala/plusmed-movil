app.controller('fichaDetalleCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, pacienteService, UtilFactory) {

    $scope.ficha = $localStorage.fichaDetalle;
    $scope.modificado = {};
    $scope.modificado.observacion = $scope.ficha.observacion;
    console.log($scope.ficha);

    $('#hideshow1').on('click', function(event) {
        $('#card-modif').toggle('show');
    });

    $scope.modificarFicha = function() {
        var param = {
            "idFichaClinica": $scope.ficha.idFichaClinica,
            "observacion": $scope.modificado.observacion
        }
        $ionicLoading.show();
        fichasService.modifFicha(param)
            .then(function(response) {
                    if (response.status == 200) {
                        UtilFactory.aceptar('Ficha modificada exitosamente', '');
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

});