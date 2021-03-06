angular.module('plusmed', [
    'ionic',
    'plusmed.controllers',
    'plusmed.services',
    'ui.router',
    'ngStorage',
    'ngCordova',
    'ionic-datepicker',
    'ngIdle',
    'ionic-native-transitions',
    'ngMessages'
])

.run(function($ionicPlatform, $ionicPopup, $rootScope, UtilFactory,
    $state, $ionicHistory) {
    $ionicPlatform.ready(function() {
        console.log('readyyyyyyyyy')
        if (window.cordova && window.Keyboard) {
            window.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {

            StatusBar.styleDefault();
        }
    });

    $ionicPlatform.registerBackButtonAction(function(e) {

        if ($state.current.name == 'menu.inicio') {
            e.preventDefault();
            $ionicPopup.show({
                title: '¿Salir de Plusmed?',
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
                    title: '¿Salir de Plusmed?',
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
    }, 1000);

})

.config(function($ionicConfigProvider, $ionicNativeTransitionsProvider, KeepaliveProvider, IdleProvider) {

    IdleProvider.idle(70 * 50); // in seconds
    IdleProvider.timeout(0); // in seconds
    IdleProvider.keepalive(false);



    $ionicNativeTransitionsProvider.enable(true);
    $ionicNativeTransitionsProvider.setDefaultOptions({
        type: 'fade',
        duration: 250, // in milliseconds (ms), default 400,
        slowdownfactor: 1, // overlap views (higher number is more) or no overlap (1), default 4
        iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
        androiddelay: -1, // same as above but for Android, default -1
        winphonedelay: -1, // same as above but for Windows Phone, default -1,
        fixedPixelsTop: 45, // the number of pixels of your fixed header, default 0 (iOS and Android)
        fixedPixelsBottom: 50, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
        triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
        backInOppositeDirection: true // Takes over default back transition and state back transition to use the opposite direction transition to go back
    });

    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.transition('platform');
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    var jsScrolling = ((ionic.Platform.isAndroid()) ? false : true);
    $ionicConfigProvider.scrolling.jsScrolling(jsScrolling);

})

.config(function($stateProvider, $httpProvider, $urlRouterProvider, $qProvider) {

    $httpProvider.defaults.withCredentials = true;
    //$httpProvider.interceptors.push('httpErrorInterceptor');

    $stateProvider

        .state('app', {
            url: '/app',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'main': {
                    templateUrl: 'templates/login.html',
                    controller: 'appCtrl'
                }
            }
        })
        .state('menu', {
            url: '/menu',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'main': {
                    templateUrl: 'templates/menu.html',
                    controller: function($ionicLoading, $ionicHistory,
                        $scope, $state, $rootScope, $location, $ionicSideMenuDelegate) {
                        $scope.$on('$ionicView.beforeEnter', function(e, data) {

                            if (data.enableBack) {
                                $scope.$root.showMenuIcon = false;
                            } else {
                                $scope.$root.showMenuIcon = true;
                            }
                            if ($location.$$path == "/menu/inicio") {
                                $scope.$root.showMenuIcon = true;
                            }

                        });

                        $scope.logout = function() {
                            $rootScope.logueado = false;
                            //localStorage.clear();
                            $state.go('app');
                        };

                        $scope.vista = function(location) {
                            $ionicSideMenuDelegate.toggleLeft();
                            setTimeout(function() {
                                $state.go(location, {}, {
                                    location: 'replace'
                                });
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                            }, 300)

                        };
                    }
                }
            }
        })
        .state('menu.inicio', {
            url: '/inicio',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/inicio.html',
                    controller: 'inicioCtrl'
                }
            }
        })
        .state('menu.autogestion', {
            url: '/inicio/autogestion',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/autogestion.html',
                    controller: 'autogestionCtrl'
                }
            }
        })
        .state('menu.pacientes', {
            url: '/inicio/pacientes',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/pacientes/pacientes.html',
                    controller: 'pacientesCtrl'
                }
            }
        })
        .state('menu.fisioterapeutas', {
            url: '/inicio/fisioterapeutas',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/empleados/fisioterapeutas.html',
                    controller: 'fisioterapeutasCtrl'
                }
            }
        })
        .state('menu.nuevo-paciente', {
            url: '/inicio/pacientes/nuevo',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/pacientes/nuevo-paciente.html',
                    controller: 'nuevoPacienteCtrl'
                }
            }
        })
        .state('menu.reservas-paciente', {
            url: '/inicio/pacientes/reservas',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/pacientes/reservas-paciente.html',
                    controller: 'reservasPacienteCtrl'
                }
            }
        })
        .state('menu.reservas-fisio', {
            url: '/inicio/fisio/reservas',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/empleados/reservas-fisio.html',
                    controller: 'reservasFisioCtrl'
                }
            }
        })
        .state('menu.fichas', {
            url: '/inicio/fichas',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/fichas/fichas.html',
                    controller: 'fichasCtrl'
                }
            }
        })

    .state('menu.nueva-ficha', {
        url: '/inicio/fichas/nueva',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/fichas/nueva-ficha.html',
                controller: 'fichaNuevaCtrl'
            }
        }
    })

    .state('menu.detalle-ficha', {
        url: '/inicio/fichas/detalle',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/fichas/detalle-ficha.html',
                controller: 'fichaDetalleCtrl'
            }
        }
    })

    .state('menu.seleccion-paciente', {
        url: '/inicio/seleccion/paciente',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/seleccion-paciente.html',
                controller: 'seleccionPacienteCtrl'
            }
        }
    })

    .state('menu.seleccion-servicio', {
        url: '/inicio/seleccion/servicio',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/seleccion-servicio.html',
                controller: 'seleccionServicioCtrl'
            }
        }
    })

    .state('menu.seleccion-fisio', {
        url: '/inicio/seleccion/fisio',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/seleccion-fisio.html',
                controller: 'seleccionFisioCtrl'
            }
        }
    })

    .state('menu.seleccion-fisio2', {
            url: '/inicio/seleccion/fisio2',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/seleccion-fisio.html',
                    controller: 'seleccionFisio2Ctrl'
                }
            }
        })
        .state('menu.seleccion-fisio3', {
            url: '/inicio/seleccion/fisio3',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/seleccion-fisio.html',
                    controller: 'seleccionFisio3Ctrl'
                }
            }
        })

    .state('menu.seleccion-paciente2', {
        url: '/inicio/seleccion/paciente',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/seleccion-paciente.html',
                controller: 'seleccionPaciente2Ctrl'
            }
        }
    })

    .state('menu.seleccion-paciente3', {
        url: '/inicio/seleccion/paciente3',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/seleccion-paciente.html',
                controller: 'seleccionPaciente3Ctrl'
            }
        }
    })

    .state('menu.filtro-fisio', {
        url: '/inicio/filtro/fisio',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/filtro-fisio.html',
                controller: 'filtroFisioCtrl'
            }
        }
    })

    .state('menu.filtro-cliente', {
            url: '/inicio/filtro/cliente',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/filtro-cliente.html',
                    controller: 'filtroClienteCtrl'
                }
            }
        })
        .state('menu.turnos', {
            url: '/inicio/turnos',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/turnos/turnos.html',
                    controller: 'turnosCtrl'
                }
            }
        })
        .state('menu.nuevo-turno', {
            url: '/inicio/nuevo-turno',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/turnos/nuevo-turno.html',
                    controller: 'nuevoTurnoCtrl'
                }
            }
        })

    .state('menu.detalle-turno', {
        url: '/inicio/turno/detalles',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/turnos/detalle-turno.html',
                controller: 'detalleTurnoCtrl'
            }
        }
    })

    .state('menu.cambiarpass', {
        url: '/inicio/cambiarpass',
        cache: false,
        nativeTransitions: {
            "type": "fade"
        },
        views: {
            'menu': {
                templateUrl: 'templates/cambiarpass.html',
                controller: 'cambiarpassCtrl'
            }
        }
    })
    $urlRouterProvider.otherwise('/app');
});