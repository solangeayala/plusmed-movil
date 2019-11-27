app.controller('fichasCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, pacienteService, fichasService, UtilFactory) {

    $scope.filtro = {};

    var today = new Date();
    $scope.trx = {};
    $scope.trx.fechaDesde = new Date(today.getFullYear(), today.getMonth(), 1);
    $scope.trx.fechaHasta = new Date();

    $scope.formatearFechaDesde = function() {
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

        var fecha = yyyy + '' + mm + '' + dd;
        $scope.filtro.fechaDesdeCadena = fecha;
        $scope.filtro.fechaHastaCadena = fecha;
        console.log(fecha);
        flagDesde = true;
    };

    $scope.verDetalles = function(ficha) {
        console.log(ficha);
    };

    $scope.obtenerFichas = function() {
        $ionicLoading.show();
        fichasService.getFichas()
            .then(function(response) {
                    if (response.status == 200) {
                        $scope.fichas = response.data.lista;
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

    $scope.obtenerFichas();

    $ionicModal.fromTemplateUrl('templates/modal-fecha-unica.html', function($ionicModal) {
        $scope.modal = $ionicModal;
        $rootScope.existeModal = $scope.modal;
    }, {
        scope: $scope,
        backdropClickToClose: true,
        animation: 'slide-in-up'
    });

    $scope.abrirModal = function() {
        $scope.modal.show();
    };

    $scope.cerrarModal = function() {
        $scope.cuenta = '';
        $scope.modal.hide();
    };

    $scope.verFecha = function() {
        $scope.modal.hide();
        $scope.formatearFechaDesde();
    };

    $('#hideshow').on('click', function(event) {
        $('#card-filtro').toggle('show');
    });

    $scope.filtrar = function() {
        console.log($scope.filtro);
        $ionicLoading.show();
        fichasService.filtroFichas($scope.filtro)
            .then(function(response) {
                    if (response.status == 200) {
                        $scope.fichas = response.data.lista;
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
        $scope.filtro = {};
    };

})