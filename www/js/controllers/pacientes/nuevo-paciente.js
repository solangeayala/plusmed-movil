app.controller('nuevoPacienteCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, pacienteService, UtilFactory) {

    $scope.datos = {};
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

        var fecha = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
        $scope.datos.fechaNacimiento = fecha;
        console.log(fecha);
        flagDesde = true;
    };

    $scope.nuevoPaciente = function() {
        console.log($scope.datos);
        $ionicLoading.show();
        pacienteService.nuevoPaciente($scope.datos)
            .then(function(response) {
                    if (response.status == 201) {
                        console.log(response);
                        UtilFactory.aceptar('Nuevo paciente añadido exitosamente', '');
                        $state.go('menu.pacientes');
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


})