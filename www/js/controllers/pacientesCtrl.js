app.controller('pacientesCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $state, $rootScope, $localStorage, pacienteService, UtilFactory) {

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

    $scope.obtenerPacientes = function() {
        $ionicLoading.show();
        pacienteService.getPacientes()
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
    };

    $scope.obtenerPacientes();

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

    /*$scope.showFiltro = function() {
        
        if ($('#card-filtro').not(':hidden')) {
            $('#card-filtro').hide();
        }
        if (!($('#card-filtro').is(':visible'))) {
            $('#card-filtro').show();
        }
    };*/

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

    $scope.nuevaFichaPaciente = function(paciente) {
        $localStorage.pacienteFichaNueva = paciente;
        $scope.cerrarModal();
        $state.go('menu.nueva-ficha');
        console.log('nueva ficha paciente', paciente);
    };


})