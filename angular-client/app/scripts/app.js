'use strict';
var module = angular.module('customer', []);

var auth = {};
var logout = function(){
    auth.loggedIn = false;
    auth.authz = null;
    window.location = auth.logoutUrl;
};


angular.element(document).ready(function ($http) {
    var keycloak = new Keycloak('keycloak.json');
    auth.loggedIn = false;

    keycloak.init({ onLoad: 'login-required' }).success(function () {
        auth.loggedIn = true;
        auth.authz = keycloak;
        auth.logoutUrl = keycloak.authServerUrl + "/realms/sebidemo/protocol/openid-connect/logout?redirect_uri=http://localhost:9000/index.html";

        module.factory('Auth', function() {
            return auth;
        });

        angular.bootstrap(document, ["customer"]);
    })
});

module.controller('GlobalCtrl', function($scope, $http) {
    $scope.customers = [];
    $scope.reloadData = function() {
        $http.get("http://localhost:8080/rest/customers").success(function(data) {
            $scope.customers = angular.fromJson(data);
        });

    };
    $scope.logout = logout;
});

module.factory('authInterceptor', function($q, Auth) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if (Auth.authz.token) {
                Auth.authz.updateToken(5).success(function() {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + Auth.authz.token;

                    deferred.resolve(config);
                }).error(function() {
                        deferred.reject('Failed to refresh token');
                    });
            }
            return deferred.promise;
        }
    };
});

module.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
