app.controller('inicioCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage,
    loginService, loginService, movimientoService, cuentaService) {


    $scope.monedas = [];
    console.log('HOLA SOSA MOTHERFUCKER');
    $scope.socio = $localStorage.socio;


    /*$ionicLoading.show();

    cuentaService.getMonedas()
        .then(function(response) {
            if (response.data.estado === 0) {
                $scope.monedas = response.data.dato;
            } else {
                console.log(response);
                //toastr.info('No se pudieron obtener las cotizaciones');
            }
            $ionicLoading.hide();
        }, function(response) {
            console.log(response);
            ionicLoading.hide();
        });*/

})