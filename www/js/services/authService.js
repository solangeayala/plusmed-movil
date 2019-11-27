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
            console.log('GET USUARIOS DEL SISTEMA');
            return $http({
                url: urlApi + '/persona',
                params: { ejemplo: { soloUsuariosDelSistema: true } },
                method: "GET",
                withCredentials: false
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