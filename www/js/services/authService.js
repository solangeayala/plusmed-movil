var app = angular.module('plusmed.services', []);

app.factory('loginService', ['$http', function($http) {
    return {
        login: function(parametros) {
            return $http({
                url: urlApi + '/api/sesion',
                method: "POST",
                withCredentials: true,
                data: parametros
            });
        },
        getUsuariosSistema: function() {
            var param = { "soloUsuariosDelSistema": true };
            return $http({
                url: urlApi + '/persona?ejemplo=' + param,
                method: "GET"
            });
        },
        cambiarContrasena: function(parametros) {
            return $http({
                url: urlApi + '/api/usuario',
                method: "POST",
                data: parametros,
                withCredentials: true
            });
        }
    }
}]);