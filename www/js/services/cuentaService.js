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