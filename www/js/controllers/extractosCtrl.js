function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function savebase64AsPDF(folderpath, filename, content, contentType) {

    var DataBlob = b64toBlob(content, contentType);

    console.log("escribiendo");

    window.resolveLocalFileSystemURL(folderpath, function (dir) {
        console.log("acceso al directorio OK");
        dir.getFile(filename, { create: true }, function (file) {
            console.log("archivo creado");
            file.createWriter(function (fileWriter) {
                console.log("escribiendo en el archivo");
                fileWriter.write(DataBlob);
            }, function () {
                alert('imposible guardar en ' + folderpath);
            });
        });
    });
}

app.controller('extractosCtrl', function ($scope, $rootScope, $ionicModal, $timeout,
    $ionicLoading, UtilFactory, $filter, $localStorage, loginService,
    movimientoService, cuentaService, $ionicPlatform, $ionicHistory, $ionicPopup) {

    $scope.ahorro = [];
    $scope.ahorroPlazoFijo = [];
    $scope.capital = [];
    $scope.ctaCte = [];
    $scope.prestamo = [];
    var flagDesde, flagHasta = false;
    var flag1, flag2, flag3, flag4, flag5 = false;

    $ionicLoading.show();

    cuentaService.consultaCuenta('PLAZO_FIJO')
        .then(function (response) {
            if (response.data.estado === 0) {
                $scope.ahorroPlazoFijo = response.data.dato;

                $.each($scope.ahorroPlazoFijo, function (i, val) {
                    console.log(val);
                    if (val.documentos) {
                        val.documentos = val.documentos.split(',');
                    } else {
                        val.documentos = [];
                    }
                    val.documentos.push('TODOS');
                });
            } else {
                //toastr.info(response.data.mensaje);
            }
            flag1 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        }, function (response) {
            flag1 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
        });

    // CAJA DE AHORRO    

    cuentaService.consultaCuenta('AHORRO')
        .then(function (response) {
            if (response.data.estado === 0) {
                $scope.ahorro = response.data.dato;
                console.log($scope.ahorro);
            } else {
                //                    //toastr.info(response.data.mensaje);
            }
            flag2 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        }, function (response) {
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
            flag2 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        });

    // CAPITAL

    cuentaService.consultaCuenta('CAPITAL')
        .then(function (response) {
            if (response.data.estado === 0) {
                $scope.capital = response.data.dato;
                console.log($scope.capital);
            } else {
                //                    //toastr.info(response.data.mensaje);
            }
            flag3 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        }, function (response) {
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
            flag3 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        });

    // CUENTA CORRIENTE

    cuentaService.consultaCuenta('CTACTE')
        .then(function (response) {
            if (response.data.estado === 0) {
                $scope.ctaCte = response.data.dato;
                console.log($scope.ctaCte);
            } else {
                //                    //toastr.info(response.data.mensaje);
            }
            flag4 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        }, function (response) {
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
            flag4 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        });

    // PRESTAMOS

    cuentaService.consultaCuenta('CREDITO')
        .then(function (response) {
            if (response.data.estado === 0) {
                $scope.prestamo = response.data.dato;
                $.each($scope.prestamo, function (i, val) {
                    if (val.pagares) {
                        val.pagares = val.pagares.split(',');
                    } else {
                        val.pagares = [];
                    }
                    val.pagares.push('TODOS');
                });
            } else {
                //toastr.info(response.data.mensaje);
            }
            flag5 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        }, function (response) {
            //toastr.info('Ha ocurrido un error, intente nuevamente', 'Atención');
            flag5 = true;
            if (flag1 && flag2 && flag3 && flag4 && flag5) {
                $ionicLoading.hide();
            }
        });

    $scope.descargarExtracto = function (seleccion, cuenta, tipo) {
        $scope.formatearFechaDesde();
        $scope.formatearFechaHasta();

        if ((flagDesde && flagHasta) || flagDesde || flagHasta) {
            var json = {
                "tipo": tipo,
                "nroCuenta": cuenta.numero,
                "nombre": cuenta.nombre,
                "idMoneda": cuenta.idMoneda
            };

            if (tipo == 'CTACTE') {
                json.fechaInicio = $scope.cuenta.fechaDesde;
                json.fechaFin = $scope.cuenta.fechaHasta;
                json.mes = '01';
                json.anho = '2019';
            } else if (tipo == 'AHORRO') {
                json.fechaInicio = $scope.cuenta.fechaDesde;
                json.fechaFin = $scope.cuenta.fechaHasta;
                json.mes = '01';
                json.anho = '2019';
            } else if (tipo == 'CREDITO') {
                json.fechaInicio = '';
                json.fechaFin = '';
                json.mes = '01';
                json.anho = '2019';
                if (cuenta.pagare != 'TODOS') {
                    json.pagare = cuenta.pagare;
                }
            } else if (tipo == 'CAPITAL') {
                json.mes = '01';
                json.anho = '2019';
            } else if (tipo == 'PLAZO_FIJO') {
                json.fechaInicio = '';
                json.fechaFin = '';
                json.mes = '01';
                json.anho = '2019';
                if (cuenta.nroDocumento != 'TODOS') {
                    json.nroDocumento = cuenta.nroDocumento;
                }
            } else {
                json.mes = getMesExtracto(seleccion.mes);
                json.anho = getAnhoExtracto(seleccion.mes);
            }
            $ionicLoading.show();
            movimientoService.extractoDescargar(json)
                .then(function (response) {
                    if (response.data.estado == 0) {
                        flagDesde,
                            flagHasta = false;
                        $scope.extractos = response.data.dato;
                        var filename = "Extracto-" + json.mes + "-" + json.anho + ".pdf";
                        var myBase64 = $scope.extractos;
                        var contentType = "application/pdf";
                        if (ionic.Platform.isAndroid()) {
                            var folderpath = cordova.file.externalRootDirectory;
                        } else {
                            var folderpath = cordova.file.documentsDirectory;
                        }
                        try {
                            savebase64AsPDF(folderpath, filename, myBase64, contentType);
                            setTimeout(function () {
                                if (ionic.Platform.isAndroid()) {
                                    var filePath= 'cdv' + folderpath;
                                } else {
                                    var filePath= folderpath;
                                }
                                cordova.plugins.fileOpener2.open(
                                    filePath + filename, // You can also use a Cordova-style file uri: cdvfile://localhost/persistent/Downloads/starwars.pdf
                                    'application/pdf', {
                                    error: function (e) {
                                        console.log('Error status: ' + e.status + ' - Error message: ' + e.message);
                                    },
                                    success: function () {
                                        console.log('file opened successfully');
                                    }
                                }
                                );
                                /*window.cordova.plugins.FileOpener.openFile(folderpath + filename, function() {
                                    console.log('exito');
                                }, function(err) {
                                    console.log(err);
                                });*/
                            }, 1000);

                        } catch (err) {
                            console.log('err in descargar extracto', err)
                            UtilFactory.aceptar('', err);
                        }
                    }
                    else {
                        flagDesde,
                            flagHasta = false;
                        UtilFactory.aceptar('No posee movimientos en la fecha seleccionada');
                    }
                    $ionicLoading.hide();
                },
                    function (response) {
                        flagDesde,
                            flagHasta = false;
                        UtilFactory.aceptar('Ha ocurrido un error, intente nuevamente');
                        $ionicLoading.hide();
                    });
        }

    };


    $ionicModal.fromTemplateUrl('templates/modal.html', function ($ionicModal) {
        $scope.modal = $ionicModal;
        $rootScope.existeModal = $scope.modal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.abrirModal = function (cuenta, tipo) {
        $scope.tipo = tipo;
        $scope.cuenta = cuenta;
        var today = new Date();
        $scope.trx = {};
        $scope.trx.fechaDesde = new Date(today.getFullYear(), today.getMonth(), 1);
        $scope.trx.fechaHasta = new Date();
        $scope.modal.show();
    };

    $scope.cerrarModal = function () {
        $scope.cuenta = '';
        $scope.modal.hide();
    };

    $scope.formatearFechaDesde = function () {
        console.log($scope.trx.fechaDesde);
        var dd = $scope.trx.fechaDesde.getDate();
        var mm = $scope.trx.fechaDesde.getMonth() + 1; //January is 0!

        var yyyy = $scope.trx.fechaDesde.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        var fecha = dd + '/' + mm + '/' + yyyy;
        $scope.cuenta.fechaDesde = fecha;
        flagDesde = true;
    };

    $scope.formatearFechaHasta = function () {
        console.log($scope.trx.fechaDesde);
        var dd = $scope.trx.fechaHasta.getDate();
        var mm = $scope.trx.fechaHasta.getMonth() + 1; //January is 0!

        var yyyy = $scope.trx.fechaHasta.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        var fecha = dd + '/' + mm + '/' + yyyy;
        $scope.cuenta.fechaHasta = fecha;
        flagHasta = true;
    };

    /*$ionicPlatform.registerBackButtonAction(function(e) {
        console.log($scope.modal.isShown());
        if ($scope.modal.isShown()) {
            e.preventDefault();
            $scope.modal.hide();
        } else if ($state.current.name == 'menu.inicio') {
            e.preventDefault();
            $ionicPopup.show({
                title: '¿Salir de Credit-Union?',
                buttons: [{
                    text: 'Cancelar',
                    type: 'button-cancelar waves-effect waves-light',
                }, {
                    text: 'Aceptar',
                    type: 'button-credit waves-effect waves-light',
                    onTap: function() {
                        ionic.Platform.exitApp();
                    }
                }]
            });
        } else if ($state.current.name == 'app') {
            ionic.Platform.exitApp();
        } else {
            var $backView = $ionicHistory.backView();
            if ($backView) {
                $backView.go();
            } else {
                $ionicPopup.show({
                    title: '¿Salir de Credit-Union?',
                    buttons: [{
                        text: 'Cancelar',
                        type: 'button-cancelar waves-effect waves-light',
                    }, {
                        text: 'Aceptar',
                        type: 'button-credit waves-effect waves-light',
                        onTap: function() {
                            ionic.Platform.exitApp();
                        }
                    }]
                });
            }
        }
    }, 1000);*/

})