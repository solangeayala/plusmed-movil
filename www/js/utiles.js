app.factory('httpErrorInterceptor', ['$q', '$rootScope', '$injector', function($q, $rootScope, $injector) {
    var requestRecoverer = {
        responseError: function(rejection) {
            $injector.get("$ionicLoading").hide();
            if (rejection.status == 401) {
                console.log('estado 401');
                $rootScope.logueado = false;
            } else if (rejection.status != 404) {
                console.log('estado', rejection.status);
                var openAlertPopup = '';
                switch (rejection.status) {
                    case 0:
                        openAlertPopup = 'No recibimos respuesta de la consulta.';
                        break;
                    case 404:
                        openAlertPopup = 'Problema en la Conexión. Intentelo de nuevo más tarde.';
                        break;
                    case 408:
                        openAlertPopup = 'Problema en la Conexión. Intentelo de nuevo más tarde.';
                        break;
                    case 500:
                        openAlertPopup = 'Problema en la Conexión. Inténtelo de nuevo más tarde.';
                        break;
                    default:
                        openAlertPopup = 'Ocurrio un error inesperado. Intentelo de nuevo más tarde.';
                        break;
                }

                $rootScope.errorGeneral = openAlertPopup;
                if ($rootScope.logueado) {
                    console.log('logueado');
                    $injector.get('$state').go('menu.inicio');
                } else {
                    //window.clearInterval(interval_id);
                    $injector.get('$state').go('app');
                }
            };
            return $q.reject(rejection);
        }
    };
    return requestRecoverer;
}]);

app.factory('UtilFactory', function($ionicPopup) {
    return {
        blockUI: function() {
            $.blockUI.defaults.css = {};
            $.blockUI({
                message: '<div>' + '<h1><i class="fas fa-spinner fa-spin"></i></h1>',
                overlayCSS: {
                    cursor: 'auto'
                },
                css: {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    'margin-right': '-50%',
                    transform: 'translate( -50%,-50%)',
                    '-ms-transform': 'translate( -50%,-50%)',
                    '-webkit-transform': 'translate(-50%,- 50%)',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: 0.3,
                    color: '#fff'
                }
            });
        },
        unBlockUI: function() {
            $.unblockUI();
        },
        aceptar: function(m1, m2) {
            $ionicPopup.show({
                title: m1,
                template: m2,
                buttons: [{
                    text: 'Aceptar',
                    type: 'button-credit waves-effect waves-light',
                }]
            });
        },
        atencion: function(m1, m2) {
            $ionicPopup.show({
                title: m1,
                template: m2,
                cssClass: 'popup',
                buttons: [{
                    text: 'Cancelar',
                    type: 'button-assertive waves-effect waves-light'
                }, {
                    text: 'Aceptar',
                    type: 'button-aceptar waves-effect waves-light'
                }]
            });
        }
    };
});


app.directive('autoSlash', [function() {
    return {
        require: 'ngModel',
        link: function(scope, iElement, iAttribute, ngModelController) {
            iElement.on('keydown', function(e) {
                var key = e.keyCode;
                if (key === 8) {
                    if (this.value.length === 3 || this.value.length === 6) {
                        this.value = this.value.substr(0, this.value.length - 1);
                    }
                    this.value = this.value.substr(0, this.value.length);
                } else if (!((key > 47 && key < 58) || (key > 95 && key < 106)) ||
                    this.value.length === 10) {
                    e.preventDefault(); //no nothing
                }
            });

            function autoSlash(veiwvalue) {
                console.log(veiwvalue);
                if (veiwvalue.length === 2 || veiwvalue.length === 5) {
                    veiwvalue += '/';
                }
                ngModelController.$setViewValue(veiwvalue);
                ngModelController.$render(); //change DOM
                if (veiwvalue.length === 10) {
                    return veiwvalue;
                }
            }

            ngModelController.$parsers.push(autoSlash);
        }
    };
}]);


function generarFechas() {
    var listFechas = [];
    var today = new Date();
    var anho = today.getFullYear();
    var mes = today.getMonth() + 1;
    for (var i = mes; i >= 1; i--) {
        var jsonFecha = {};
        jsonFecha.mes = anho.toString() + ";" + i.toString();
        jsonFecha.descripcion = getMes(i) + '-' + anho;
        listFechas.push(jsonFecha);
    }
    for (var i = 12; i >= mes; i--) {
        var jsonFecha = {};
        jsonFecha.mes = (anho - 1).toString() + ";" + i.toString();
        jsonFecha.descripcion = getMes(i) + '-' + (anho - 1);
        listFechas.push(jsonFecha);
    }
    return listFechas;
}

function getMes(mesNum) {
    if (mesNum === 1) {
        return "Enero";
    } else if (mesNum === 2) {
        return "Febrero";
    } else if (mesNum === 3) {
        return "Marzo";
    } else if (mesNum === 4) {
        return "Abril";
    } else if (mesNum === 5) {
        return "Mayo";
    } else if (mesNum === 6) {
        return "Junio";
    } else if (mesNum === 7) {
        return "Julio";
    } else if (mesNum === 8) {
        return "Agosto";
    } else if (mesNum === 9) {
        return "Septiembre";
    } else if (mesNum === 10) {
        return "Octubre";
    } else if (mesNum === 11) {
        return "Noviembre";
    } else if (mesNum === 12) {
        return "Diciembre";
    }
}

function generarMes(input) {
    var mes = input.substr(0, input.indexOf('-'));
    if (mes === 'Enero') {
        return "01";
    } else if (mes === 'Febrero') {
        return "02";
    } else if (mes === 'Marzo') {
        return "03";
    } else if (mes === 'Abril') {
        return "04";
    } else if (mes === 'Mayo') {
        return "05";
    } else if (mes === 'Junio') {
        return "06";
    } else if (mes === 'Julio') {
        return "07";
    } else if (mes === 'Agosto') {
        return "08";
    } else if (mes === 'Septiembre') {
        return "09";
    } else if (mes === 'Octubre') {
        return "10";
    } else if (mes === 'Noviembre') {
        return "11";
    } else if (mes === 'Diciembre') {
        return "12";
    }
}

function generarAnho(input) {
    var anho = input.substr(input.indexOf('-') + 1, input.lenght);
    return anho;
}

function getMesExtracto(input) {
    var month = parseInt(input.slice(5, 7));
    if (month < 10) {
        month = '0' + month;
    }
    return month;
}

function getAnhoExtracto(input) {
    var year = parseInt(input.slice(0, 4));
    return year;
}

function getFecha() {
    var d = new Date;
    dia = d.getDate();
    mes = d.getMonth() + 1;
    hh = d.getHours();
    mm = d.getMinutes();
    ss = d.getSeconds();
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    dformat = dia + "/" + mes + "/" + d.getFullYear() + ' ' + hh + ":" + mm + ":" + ss;
    return dformat;
}

showPopup = function() {
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
        cssClass: 'popup',
        subTitle: 'Usuario/Contrasena incorrectos',
        scope: $scope,
        buttons: [
            { text: 'Aceptar' }
        ]
    });
};