app.factory('cuentaService', ['$http', function($http) {
    return {
        consultaCuenta: function(cuenta) {
            return $http({
                url: urlApi + '/api/consulta/' + cuenta,
                withCredentials: true,
                method: "GET"
            });
        },
        getMonedas: function() {
            return $http({
                url: urlApi + '/api/monedas',
                method: "GET",
                withCredentials: true
            });
        },
    }
}]);

app.factory('pacienteService', ['$http', function($http) {
    return {
        getPacientes: function() {
            return $http({
                url: urlApi + '/persona',
                method: "GET",
                withCredentials: false
            });
        },
        nuevoPaciente: function(dato) {
            return $http({
                url: urlApi + '/persona',
                method: "POST",
                data: dato,
                withCredentials: false
            });
        },
        getPacienteID: function(dato) {
            return $http({
                url: urlApi + '/persona',
                params: { ejemplo: { idPersona: dato } },
                method: "GET",
                withCredentials: false
            });
        },
        getHorariosFisio: function(dato) {
            return $http({
                url: urlApi + '/persona/' + dato.idEmpleado.idPersona + '/agenda?fecha=' + dato.fechaCadena + '&disponible=S',
                method: "GET",
                withCredentials: false
            });
        },

        filtroPaciente: function(dato) {
            if (!dato.apellido) {
                return $http({
                    url: urlApi + '/persona',
                    params: { ejemplo: { nombre: dato.nombre } },
                    method: "GET",
                    withCredentials: false
                });
            }
            if (!dato.nombre) {
                var param = { "apellido": dato.apellido };
                return $http({
                    url: urlApi + '/persona',
                    params: { ejemplo: { apellido: dato.apellido } },
                    method: "GET",
                    withCredentials: false
                });
            }
        },
    }
}]);

app.factory('fichasService', ['$http', function($http) {
    return {
        getFichas: function() {
            return $http({
                url: urlApi + '/fichaClinica',
                method: "GET",
                withCredentials: false
            });
        },
        nuevaFicha: function(dato) {
            return $http({
                url: urlApi + '/fichaClinica',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'usuario': 'gustavo'
                },
                data: dato,
                withCredentials: false
            });
        },
        archFicha: function(dato) {
            return $http({
                url: urlApi + '/fichaArchivo/archivo',
                method: "POST",
                data: dato,
                headers: { 'Content-Type': undefined },
                //prevents serializing payload.  don't do it.
                transformRequest: angular.identity,
                withCredentials: false
            });
        },
        modifFicha: function(dato) {
            return $http({
                url: urlApi + '/fichaClinica',
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'usuario': 'gustavo'
                },
                data: dato,
                withCredentials: false
            });
        },
        getArchivosFicha: function(dato) {
            return $http({
                url: urlApi + '/fichaArchivo?idFichaClinica=' + dato,
                method: "GET",
                withCredentials: false
            });
        },
        deleteArchivoFicha: function(dato) {
            return $http({
                url: urlApi + '/fichaArchivo/' + dato,
                method: "DELETE",
                withCredentials: false
            });
        },
        filtroFichas: function(dato) {
            if (dato.fechaDesdeCadena) {
                return $http({
                    url: urlApi + '/fichaClinica',
                    params: { ejemplo: { fechaDesdeCadena: dato.fechaDesdeCadena, fechaHastaCadena: dato.fechaHastaCadena } },
                    method: "GET",
                    withCredentials: false
                });
            }
            if (dato.idCliente) {
                return $http({
                    url: urlApi + '/fichaClinica',
                    params: { ejemplo: { idCliente: { idPersona: dato.idCliente } } },
                    method: "GET",
                    withCredentials: false
                });
            }
        },
    }
}]);

app.factory('serviciosService', ['$http', function($http) {
    return {
        getServicios: function() {
            return $http({
                url: urlApi + '/presentacionProducto',
                method: "GET",
                withCredentials: false
            });
        },
    }
}]);

app.factory('reservasService', ['$http', function($http) {
    return {
        getReservas: function() {
            return $http({
                url: urlApi + '/reserva',
                method: "GET",
                withCredentials: false
            });
        },
        nuevaReserva: function(dato) {
            return $http({
                url: urlApi + '/reserva',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'usuario': 'gustavo'
                },
                data: dato,
                withCredentials: false
            });
        },
        marcarReserva: function(dato) {
            return $http({
                url: urlApi + '/reserva',
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: dato,
                withCredentials: false
            });
        },
        getReservasPaciente: function(dato) {
            return $http({
                url: urlApi + '/reserva',
                params: { ejemplo: { idCliente: { idPersona: dato.idPersona } } },
                method: "GET",
                withCredentials: false
            });
        },
        getReservasFisio: function(dato) {
            return $http({
                url: urlApi + '/reserva',
                params: { ejemplo: { idEmpleado: { idPersona: dato.idPersona } } },
                method: "GET",
                withCredentials: false
            });
        },
        filtroReservas: function(dato) {
            console.log('DATO DESDE SERVICIO', dato);
            if (dato.fechas.fechaDesdeCadena && dato.fechas.fechaHastaCadena) {
                if (dato.idEmpleado) {
                    return $http({
                        url: urlApi + '/reserva',
                        params: { ejemplo: { idEmpleado: { idPersona: dato.idEmpleado.idPersona }, fechaDesdeCadena: dato.fechas.fechaDesdeCadena, fechaHastaCadena: dato.fechas.fechaHastaCadena } },
                        method: "GET",
                        withCredentials: false
                    });
                } else if (dato.idCliente) {
                    return $http({
                        url: urlApi + '/reserva',
                        params: { ejemplo: { idCliente: { idPersona: dato.idCliente.idPersona }, fechaDesdeCadena: dato.fechas.fechaDesdeCadena, fechaHastaCadena: dato.fechas.fechaHastaCadena } },
                        method: "GET",
                        withCredentials: false
                    });
                } else {
                    return $http({
                        url: urlApi + '/reserva',
                        params: { ejemplo: { fechaDesdeCadena: dato.fechas.fechaDesdeCadena, fechaHastaCadena: dato.fechas.fechaHastaCadena } },
                        method: "GET",
                        withCredentials: false
                    });
                }
            }

            if (dato.idEmpleado && !dato.fechas.fechaDesdeCadena && !dato.fechas.fechaHastaCadena) {
                return $http({
                    url: urlApi + '/reserva',
                    params: { ejemplo: { idEmpleado: { idPersona: dato.idEmpleado.idPersona } } },
                    method: "GET",
                    withCredentials: false
                });
            }

            if (dato.idCliente && !dato.fechas.fechaDesdeCadena && !dato.fechas.fechaHastaCadena) {
                return $http({
                    url: urlApi + '/reserva',
                    params: { ejemplo: { idCliente: { idPersona: dato.idCliente.idPersona } } },
                    method: "GET",
                    withCredentials: false
                });
            }
        },
    }
}]);