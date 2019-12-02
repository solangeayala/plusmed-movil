app.controller('fichaNuevaCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, fichasService, UtilFactory) {

    //downloadFile("http://www.pol.una.py/archivos/Horario_clases_examenes_Segundo_Periodo_17102019.xls");

    $scope.datos = {};
    $scope.flagFicha = false;
    $scope.flagServ = false;
    $scope.flagFisio = false;
    $localStorage.flagFiltro = false;

    if ($localStorage.auxpaciente) {
        $scope.flagFicha = true;
        $scope.cliente = $localStorage.auxpaciente;
        $scope.datos.idCliente = {
            "idPersona": $scope.cliente.idPersona
        };
    }
    if ($localStorage.auxservicio) {
        $scope.flagServ = true;
        $scope.producto = $localStorage.auxservicio;
        $scope.datos.idTipoProducto = {
            "idTipoProducto": $scope.producto.idProducto.idTipoProducto.idTipoProducto
        };
    }

    if ($localStorage.pacienteFichaNueva) {
        console.log('HAY PACIENTE PRESELECCIONADO');
        $scope.flagFicha = true;
        $scope.cliente = $localStorage.pacienteFichaNueva;
        $scope.datos.idCliente = {
            "idPersona": $scope.cliente.idPersona
        };
        $localStorage.auxpaciente = $scope.cliente;
        delete $localStorage.pacienteFichaNueva;
    }

    if ($localStorage.pacienteSeleccion2) {
        console.log('PACIENTE seleccionado');
        $scope.flagFicha = true;
        $scope.cliente = $localStorage.pacienteSeleccion2;
        $scope.datos.idCliente = {
            "idPersona": $scope.cliente.idPersona
        };
        $localStorage.auxpaciente = $scope.cliente;
        delete $localStorage.pacienteSeleccion2;
    }

    if ($localStorage.servicioSeleccion) {
        console.log('SERVICIO seleccionado');
        $scope.flagServ = true;
        $scope.producto = $localStorage.servicioSeleccion;
        $scope.datos.idTipoProducto = {
            "idTipoProducto": $scope.producto.idProducto.idTipoProducto.idTipoProducto
        };
        $localStorage.auxservicio = $scope.producto;
        delete $localStorage.servicioSeleccion;
    }

    if ($localStorage.fisioSeleccion) {
        console.log('SERVICIO seleccionado');
        $scope.flagFisio = true;
        $scope.fisio = $localStorage.fisioSeleccion;
        $scope.datos.idEmpleado = {
            "idPersona": $scope.fisio.idPersona
        };
        $localStorage.auxfisio = $scope.fisio;
        delete $localStorage.fisioSeleccion;
    }

    $scope.nuevaFicha = function() {
        console.log($scope.datos);
        delete $localStorage.auxservicio;
        delete $localStorage.auxpaciente;
        delete $localStorage.auxfisio;
        $ionicLoading.show();
        fichasService.nuevaFicha($scope.datos)
            .then(function(response) {
                    if (response.status == 200) {
                        console.log(response);
                        UtilFactory.aceptar('Nueva ficha añadida exitosamente', '');
                        $state.go('menu.fichas');
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