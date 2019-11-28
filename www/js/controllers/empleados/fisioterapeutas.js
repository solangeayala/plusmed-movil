app.controller('fisioterapeutasCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, loginService, UtilFactory) {

    $scope.filtro = {};

    $ionicModal.fromTemplateUrl('templates/modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
        $rootScope.existeModal = $scope.modal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.obtenerFisios = function() {
        $ionicLoading.show();
        loginService.getUsuariosSistema()
            .then(function(response) {
                    if (response.status == 200) {
                        $scope.fisios = response.data.lista;
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

    $scope.obtenerFisios();

    $scope.abrirModal = function(cuenta, tipo, fisio) {
        $scope.tipo = tipo;
        $scope.cuenta = cuenta;
        $scope.fisio = fisio;
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

    $scope.verReservas = function(fisio) {
        $localStorage.fisioVerReservas = fisio;
        $scope.cerrarModal();
        $state.go('menu.reservas-fisio');
    };


})