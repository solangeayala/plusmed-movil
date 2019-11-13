app.controller('consultasCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, loginService, loginService, movimientoService, cuentaService) {

    $scope.ahorro = [];
    $scope.ahorroPlazoFijo = [];
    $scope.capital = [];
    $scope.ctaCte = [];
    $scope.prestamo = [];
    $scope.monedas = [];

    $scope.socio = $localStorage.socio;

    var flag1, flag2, flag3, flag4, flag5, flag6 = false;

    $ionicLoading.show();

    cuentaService.getMonedas()
        .then(function(response) {
            if (response.data.estado === 0) {
                $scope.monedas = response.data.dato;
            } else {
                ////toastr.info('No se pudieron obtener las cotizaciones');
            }
            flag6 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        }, function(response) {
            flag6 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }

        });

    cuentaService.consultaCuenta('PLAZO_FIJO')
        .then(function(response) {
            if (response.data.estado === 0) {
                $scope.ahorroPlazoFijo = response.data.dato;
                console.log($scope.ahorroPlazoFijo);
            } else {
                //                    //toastr.info(response.data.mensaje);
            }
            flag1 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        }, function(response) {
            flag1 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
        });

    // CAJA DE AHORRO    

    cuentaService.consultaCuenta('AHORRO')
        .then(function(response) {
            if (response.data.estado === 0) {
                $scope.ahorro = response.data.dato;
                console.log($scope.ahorro);
            } else {
                //                    //toastr.info(response.data.mensaje);
            }
            flag2 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        }, function(response) {
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
            flag2 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        });

    // CAPITAL

    cuentaService.consultaCuenta('CAPITAL')
        .then(function(response) {
            if (response.data.estado === 0) {
                $scope.capital = response.data.dato;
                console.log($scope.capital);
            } else {
                //                    //toastr.info(response.data.mensaje);
            }
            flag3 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        }, function(response) {
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
            flag3 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        });

    // CUENTA CORRIENTE

    cuentaService.consultaCuenta('CTACTE')
        .then(function(response) {
            if (response.data.estado === 0) {
                $scope.ctaCte = response.data.dato;
                console.log($scope.ctaCte);
            } else {
                //                    //toastr.info(response.data.mensaje);
            }
            flag4 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        }, function(response) {
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
            flag4 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        });

    // PRESTAMOS

    cuentaService.consultaCuenta('CREDITO')
        .then(function(response) {
            if (response.data.estado === 0) {
                $scope.prestamo = response.data.dato;
                console.log($scope.prestamo);
            } else {
                //                    //toastr.info(response.data.mensaje);
            }
            flag5 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        }, function(response) {
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
            flag5 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
                $ionicLoading.hide();
            }
        });
})