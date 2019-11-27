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