app.factory('movimientoService', ['$http', function($http) {
    return {
        movimientoCuenta: function(cuenta) {
            return $http({
                url: urlApi + '/api/movimientos',
                method: 'POST',
                withCredentials: true,
                data: cuenta
            });
        },
        extractoDescargar: function(cuenta) {
            return $http({
                url: urlApi + '/api/extractos',
                method: "POST",
                withCredentials: true,
                data: cuenta
            });
        },
    }
}]);