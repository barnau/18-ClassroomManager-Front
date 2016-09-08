(function() {
    'use strict';

    angular
        .module('app')
        .factory('DashboardFactory', DashboardFactory);

    DashboardFactory.$inject = ['$http'];

    /* @ngInject */
    function DashboardFactory($http) {
        var service = {
            getDashboardInfo: getDashboardInfo
        };
        return service;

        ////////////////

        function getDashboardInfo() {
        	return $http.get('http://localhost:53122/api/dashboard');
        }
    }
})();