app.controller('seleccionFisioCtrl', function($scope, $ionicModal, $timeout,
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

    $scope.obtenerFisio = function() {
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

    $scope.obtenerFisio();

    $scope.seleccionarFisio = function(serv) {
        $ionicLoading.show();
        $localStorage.fisioSeleccion = serv;
        $ionicLoading.hide();
        $state.go('menu.nueva-ficha');
    };

    $('#hideshow').on('click', function(event) {
        $('#card-filtro').toggle('show');
    });

});