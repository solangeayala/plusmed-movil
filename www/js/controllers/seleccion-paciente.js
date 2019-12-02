app.controller('seleccionPacienteCtrl', function($scope, $ionicModal, $timeout,
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

    $scope.seleccionarPaciente = function(paciente) {
        $ionicLoading.show();
        $localStorage.pacienteSeleccion2 = paciente;
        $ionicLoading.hide();
        if ($localStorage.flagReservaFiltro == true) {
            $state.go('menu.filtro-cliente');
        } else {
            $state.go('menu.nueva-ficha');
        }
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