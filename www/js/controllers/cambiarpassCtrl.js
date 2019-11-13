app.controller('cambiarpassCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage,
    loginService, loginService, UtilFactory) {
    console.log('cambiar pass');
    $scope.datos = {};
    $scope.datos.actual = "";
    $scope.datos.nuevo = "";
    $scope.datos.confirmacion = "";

    $scope.mostrarPass = function(nro) {
        console.log('mostrarpass');
        var x = document.getElementById("idPassword" + nro);
        var icono = document.getElementById("iconoPass" + nro);
        if ((x.value != '') && (x.type === "password")) {
            icono.className = "fas fa-eye-slash";
            icono.style.color = "black";
            x.type = "text";
        } else {
            icono.className = "fas fa-eye";
            icono.style.color = "#999999";
            x.type = "password";
        }
    };

    $scope.cambiarPass = function(form) {

        var parametros = {
            "passActual": $scope.datos.actual,
            "passNuevo": $scope.datos.nuevo
        };

        if ($scope.datos.nuevo == $scope.datos.confirmacion) {
            if ($scope.datos.nuevo.length >= 8) {
                $ionicLoading.show();
                loginService.cambiarContrasena(parametros)
                    .then(function(response) {
                            console.log(response.data);
                            if (response.data.estado === 0) {
                                var socio = $localStorage.socio;
                                socio.cambioPwd = false;
                                $localStorage.socio = socio;
                                UtilFactory.aceptar('Contraseña cambiada con exito');
                                $state.go('menu.inicio');
                                console.log(response.data.dato);
                            } else {
                                UtilFactory.aceptar('Contraseña Actual inválida');
                            }
                            $ionicLoading.hide();
                            $scope.datos = {};
                        },
                        function(response) {
                            UtilFactory.aceptar('Ha ocurrido un error, intente nuevamente');
                            $ionicLoading.hide();
                        });
            } else {
                UtilFactory.aceptar('El password nuevo debe tener al menos 8 caracteres');
                $ionicLoading.hide();
            }
        } else {
            UtilFactory.aceptar('El password nuevo y la confirmación no coinciden');
            $ionicLoading.hide();
        }
    };

})