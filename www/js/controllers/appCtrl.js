var app = angular.module('plusmed.controllers', [])

.controller('appCtrl', function($scope, $ionicModal, $timeout,
    $ionicLoading, $ionicHistory, $ionicModal, $state, $rootScope, UtilFactory, $localStorage,
    $ionicPlatform, loginService, Idle, $ionicPopup) {

    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    var avoidPopupIdle = true;
    $rootScope.logueado = false;
    $scope.loginData = {};

    $rootScope.$on('IdleStart', function() {
        console.log('sesion expirada');
        if ($rootScope.existeModal.isShown()) {
            $rootScope.existeModal.hide();
        }
        Idle.unwatch();
        $ionicPopup.confirm({
            title: '<span class="span-registrar">Su sesión ha expirado, favor vuelva a iniciar sesión.</span>',
            template: '<img src="../img/time-left.png" style="width: 60px;">',
            cssClass: 'registrar-huella',
            buttons: [{
                text: 'Aceptar',
                type: 'button-credit',
                onTap: function() {
                    //console.log('motherfucker');
                    $state.go('app');
                }
            }]
        });
    });


    $ionicPlatform.ready(function() {
        $scope.fingerprintDisponible = false;
        if (ionic.Platform.isAndroid()) {
            FingerprintAuth.isAvailable(function(result) {
                if (result.isAvailable) {
                    $scope.fingerprintDisponible = true;
                } else {
                    $scope.fingerprintDisponible = false;
                }
            }, function(message) {
                $scope.fingerprintDisponible = false;
            });
        } else {
            if (window.plugins && window.plugins.touchid) {
                window.plugins.touchid.isAvailable(function(biometric) {
                    var serviceName = (biometric === "face") ? "Face ID" : "Touch ID";
                    $scope.fingerprintDisponible = true;
                });
            } else {
                $scope.fingerprintDisponible = false;
            }
        }
        if ($localStorage.huellasTable) {
            if ($localStorage.huellasTable.estado == 1) {
                $scope.fingerprint = true;
                $scope.loginData.documento = $localStorage.huellasTable.usuario;
                $scope.tokenUsu = $localStorage.huellasTable.token;
                $scope.fingerprintRegistrado = true;
            } else if ($localStorage.huellasTable.estado == 2 || $localStorage.huellasTable.estado == 3) {
                $scope.loginData.documento = $localStorage.huellasTable.usuario;
                $scope.fingerprintDisponible = false;
            } else {
                $scope.fingerprint = false;
            }
        } else {
            $scope.fingerprint = false;
        }

        $scope.tieneHuella = $localStorage.huellasTable && $scope.fingerprintRegistrado;

    });

    $scope.checkfinger = function() {
        if ($localStorage.huellasTable) {
            if ($scope.fingerprintRegistrado == true) {
                console.log($scope.fingerprintRegistrado);
                $scope.showAutenticacionHuella();
            }
        }
    };

    $scope.checklogin = function(loginForm) {
        if ($scope.tieneHuella) {
            $scope.showAutenticacionHuella();
        } else {
            if (loginForm.$valid) {
                $scope.login();
            }
        }
    };

    $scope.showAutenticacionHuella = function() {
        $localStorage.loginConHuella = false;
        if (ionic.Platform.isAndroid()) {
            var decryptConfig = {
                clientId: "AppCreditUnion",
                username: "AppCreditUnionUser",
                token: $scope.tokenUsu,
                locale: "es",
                disableBackup: "true"
            };
            FingerprintAuth.decrypt(decryptConfig, function(result) {
                console.log(result);
                console.log('entra al fingerprintAuth');
                if (result.withFingerprint) {
                    if (result.password) {
                        $scope.loginData.password = result.password;
                        $localStorage.loginConHuella = true;
                        $scope.login();
                    }
                }
            }, function(error) {
                if (error === FingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                    $scope.fingerprintRegistrado = false;
                }
            });
        } else {
            if (window.plugins.touchid) {
                window.plugins.touchid.verify($scope.loginData.documento, "Presione el sensor para continuar.", function(password) {
                    $localStorage.loginConHuella = true;
                    $scope.loginData.password = password;
                    $scope.login();
                });
            }
        }
    };

    $scope.registrarHuella = function() {
        if (ionic.Platform.isAndroid()) {
            var encryptConfig = {
                clientId: "AppCreditUnion",
                username: "AppCreditUnionUser",
                password: $scope.loginData.password,
                locale: "es",
                disableBackup: "true"
            };
            console.log(encryptConfig);
            FingerprintAuth.encrypt(encryptConfig, function(result) {
                var json = {
                    'usuario': $scope.loginData.documento,
                    'estado': 1,
                    'token': result.token
                };
                localStorage.setItem('huellasTable', JSON.stringify(json));
                $localStorage.huellasTable = json;
                console.log($localStorage.huellasTable);
                $scope.goMenuKP();
            }, function(err) {
                $ionicPopup.alert({
                    title: mensaje.Atencion,
                    template: "Autenticación inválida ",
                    buttons: [{
                        text: mensaje.Aceptar,
                        type: 'button-assertive waves-effect waves-light'
                    }]
                }).then(function() {
                    $scope.goMenuKP();
                });
            });
        } else {
            if (window.plugins) {
                window.plugins.touchid.save($scope.loginData.documento, $scope.loginData.password, function(password) {
                    var json = {
                        'usuario': $scope.loginData.documento,
                        'estado': 1,
                        'token': 'asd'
                    };
                    localStorage.setItem('huellasTable', JSON.stringify(json));
                    $localStorage.huellasTable = json;
                    $scope.goMenuKP();
                });
            }
        }
    };

    $scope.asd = function() {
        console.log('entrando asd');
        console.log('fingerprintDisponible ', $scope.fingerprintDisponible);
        console.log('fingerprint ', $scope.fingerprint);
        $ionicLoading.hide();
        if ($scope.fingerprintDisponible == true && ($scope.fingerprint == false || !$localStorage.huellasTable)) {
            $ionicPopup.confirm({
                title: '<span class="span-registrar">¿Desea registrar su huella para futuros ingresos?</span>',
                template: '<img src="../img/identity.png" style="width: 90px;">',
                okText: 'Aceptar',
                cssClass: 'registrar-huella',
                cancelText: 'Cancelar',
            }).then(function(res) {
                if (res) {
                    $scope.registrarHuella();
                } else {
                    $scope.goMenuKP();
                }
            });
        } else {
            if ($scope.fingerprintDisponible == false) {
                var json = {
                    'usuario': $scope.loginData.documento,
                    'estado': 3
                };
                $localStorage.huellasTable = json;
                $scope.goMenuKP();
            } else {
                $scope.goMenuKP();
            }
        }

    };

    $scope.loginData = {};

    $scope.goMenuKP = function() {
        Idle.watch();
        $state.go('menu.inicio');
    };

    $scope.login = function() {
        var parametros = {
            "username": $scope.loginData.documento,
            "password": $scope.loginData.password,
        }
        $ionicLoading.show();
        console.log('parametros ', parametros);
        loginService.getUsuariosSistema()
            .then(function(response) {
                    if (response.status == 200) {
                        $scope.flag = false;
                        console.log(response.data);
                        angular.forEach(response.data.lista, function(value) {
                            if (parametros.username == value.email) {
                                $localStorage.socio = value;
                                $scope.flag = true;
                                $scope.asd();
                            }
                        });
                        if (!$scope.flag) {
                            UtilFactory.aceptar('Atención', mensaje.errorPin);
                        }
                        $ionicLoading.hide();
                    } else {
                        UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                        $ionicLoading.hide();
                    }
                    $scope.datos = {};
                },
                function(response) {
                    UtilFactory.aceptar('Atención', 'Ha ocurrido un error, intente nuevamente');
                    $ionicLoading.hide();
                });
    };

    $scope.mostrarPass = function() {
        console.log('mostrarpass');
        var x = document.getElementById("idPassword");
        var icono = document.getElementById("iconoPass");
        if ((x.value != '') && (x.type === "password")) {
            icono.className = "fas fa-eye-slash";
            icono.style.color = "#4accae";
            x.type = "text";
        } else {
            icono.className = "fas fa-eye";
            icono.style.color = "#999999";
            x.type = "password";
        }
    };

})