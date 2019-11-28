function downloadFile(url) {
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);
    var filepath = "www/download/";

    fileTransfer.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
        } else {
            loadingStatus.increment();
        }
    };
    console.log('hola sol');
    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        },
        false, {
            headers: {

            }
        }
    );
}

app.controller('fichaNuevaCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, fichasService, UtilFactory) {

    downloadFile('imagenes.jpg');

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

    if ($localStorage.pacienteSeleccion) {
        console.log('PACIENTE seleccionado');
        $scope.flagFicha = true;
        $scope.cliente = $localStorage.pacienteSeleccion;
        $scope.datos.idCliente = {
            "idPersona": $scope.cliente.idPersona
        };
        $localStorage.auxpaciente = $scope.cliente;
        delete $localStorage.pacienteSeleccion;
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