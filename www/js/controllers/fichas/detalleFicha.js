app.controller('fichaDetalleCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, $window, fichasService, pacienteService, UtilFactory) {

    $scope.ficha = $localStorage.fichaDetalle;
    $scope.modificado = {};
    $scope.elem = {};
    $scope.modificado.observacion = $scope.ficha.observacion;
    console.log($scope.ficha);

    $('#hideshow1').on('click', function(event) {
        $('#card-modif').toggle('show');
    });

    $('#hideshowArchivo').on('click', function(event) {
        $('#card-adj').toggle('show');
    });

    $scope.agregarArchivo = function() {
        var archivo = document.getElementById('archivoFicha');
        angular.forEach(archivo.files, function(value) {
            console.log(value);
            var formImagen = new FormData();
            formImagen.append('file', value);
            formImagen.append('nombre', value.name);
            formImagen.append('idFichaClinica', $scope.ficha.idFichaClinica);
            setTimeout(function() {
                $ionicLoading.show();
                fichasService.archFicha(formImagen)
                    .then(function(response) {
                            if (response.status == 200) {
                                UtilFactory.aceptar('Archivo subido exitosamente', '');
                                console.log(response);
                            } else {
                                UtilFactory.aceptar('Atención', 'Ha ocurrido un error al subir el archivo');
                            }
                            $ionicLoading.hide();
                        },
                        function(response) {
                            $window.location.reload(true);
                            UtilFactory.aceptar('Archivo añadido');
                            $ionicLoading.hide();
                        });
            }, 500);
        });
    };

    $scope.modificarFicha = function() {
        var param = {
            "idFichaClinica": $scope.ficha.idFichaClinica,
            "observacion": $scope.modificado.observacion
        }
        $ionicLoading.show();
        fichasService.modifFicha(param)
            .then(function(response) {
                    if (response.status == 200) {
                        $window.location.reload(true);
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
    };

    $scope.archivosFicha = function() {
        $ionicLoading.show();
        fichasService.getArchivosFicha($scope.ficha.idFichaClinica)
            .then(function(response) {
                    if (response.status == 200) {
                        $scope.archivos = response.data.lista;
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

    $scope.eliminarArchivo = function(archivo) {
        $ionicLoading.show();
        fichasService.deleteArchivoFicha(archivo.idFichaArchivo)
            .then(function(response) {
                    if (response.status == 200) {
                        $window.location.reload(true);
                        UtilFactory.aceptar('Archivo eliminado exitosamente', '');
                        location.reload();
                        //$state.go('menu.fichas');
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

    $scope.archivosFicha();

});