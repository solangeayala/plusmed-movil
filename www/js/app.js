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
    }, 1000);

})

.config(function($ionicConfigProvider, $ionicNativeTransitionsProvider, KeepaliveProvider, IdleProvider) {

    IdleProvider.idle(2 * 50); // in seconds
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
        .state('menu.extractos', {
            url: '/inicio/extractos',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/extractos.html',
                    controller: 'extractosCtrl'
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
        .state('menu.consultas', {
            url: '/inicio/consultas',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/consultas.html',
                    controller: 'consultasCtrl'
                }
            }
        })
        .state('menu.consultas-ahorrofijo', {
            url: '/inicio/consultas/ahorrofijo',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/consultas/plazofijo.html',
                    controller: 'ahorrofijoCtrl'
                }
            }
        })
        .state('menu.consultas-capital', {
            url: '/inicio/consultas/capital',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/consultas/capital.html',
                    controller: 'capitalCtrl'
                }
            }
        })
        .state('menu.consultas-ahorro', {
            url: '/inicio/consultas/ahorro',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/consultas/ahorro.html',
                    controller: 'ahorroCtrl'
                }
            }
        })
        .state('menu.consultas-ctacte', {
            url: '/inicio/consultas/ctacte',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/consultas/ctacte.html',
                    controller: 'ctacteCtrl'
                }
            }
        })
        .state('menu.consultas-prestamo', {
            url: '/inicio/consultas/prestamo',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/consultas/prestamos.html',
                    controller: 'prestamosCtrl'
                }
            }
        })
        .state('menu.extractos-ctacte', {
            url: '/inicio/extractos/ctacte',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/extractos/ctacte.html',
                    controller: 'extractoCtaCteCtrl'
                }
            }
        })
        .state('menu.cheques-rechazados', {
            url: '/inicio/extractos/cheques-rechazados',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/extractos/cheques-rechazados.html',
                    controller: 'chequesRechazadosCtrl'
                }
            }
        })
        .state('menu.extractos-ahorro', {
            url: '/inicio/extractos/ahorro',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            params: {
                cuenta: null
            },
            views: {
                'menu': {
                    templateUrl: 'templates/extractos/ahorro.html',
                    controller: 'extractoAhorroCtrl'
                }
            }
        })
        .state('menu.extractos-ahorrofijo', {
            url: '/inicio/extractos/ahorrofijo',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/extractos/ahorrofijo.html',
                    controller: 'extractoFijoCtrl'
                }
            }
        })
        .state('menu.extractos-capital', {
            url: '/inicio/extractos/capital',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/extractos/capital.html',
                    controller: 'extractoCapitalCtrl'
                }
            }
        })
        .state('menu.extractos-prestamos', {
            url: '/inicio/extractos/prestamos',
            cache: false,
            nativeTransitions: {
                "type": "fade"
            },
            views: {
                'menu': {
                    templateUrl: 'templates/extractos/prestamos.html',
                    controller: 'extractoPrestamoCtrl'
                }
            }
        })
        // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app');
});