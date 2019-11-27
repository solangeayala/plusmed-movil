app.controller('fichasCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, pacienteService, fichasService, UtilFactory) {

    $scope.filtro = {};

    $ionicModal.fromTemplateUrl('templates/modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
        $rootScope.existeModal = $scope.modal;
    }, {
        scope: $scope,
        animation: 'slide-in-up'
    });

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

    $scope.abrirModal = function(cuenta, tipo) {
        $scope.tipo = tipo;
        $scope.cuenta = cuenta;
        var today = new Date();
        $scope.trx = {};
        $scope.trx.fechaDesde = new Date(today.getFullYear(), today.getMonth(), 1);
        $scope.trx.fechaHasta = new Date();
        $scope.modal.show();
    };

    $scope.cerrarModal = function() {
        $scope.cuenta = '';
        $scope.modal.hide();
    };

    $('#hideshow').on('click', function(event) {
        $('#card-filtro').toggle('show');
    });

    $scope.filtrar = function() {
        console.log($scope.filtro);
        $ionicLoading.show();
        pacienteService.filtroPaciente($scope.filtro)
            .then(function(response) {
                    if (response.status == 200) {
                        $scope.pacientes = response.data.lista;
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