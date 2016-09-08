(function() {
    'use strict';

    angular
        .module('app')
        .factory('AssignmentsFactory', AssignmentsFactory);

    AssignmentsFactory.$inject = ['$http', 'toastr'];

    /* @ngInject */
    function AssignmentsFactory($http, toastr) {
        var service = {
            getAssignments: getAssignments,
            postAssignment: postAssignment,
            getAssignmentsById: getAssignmentsById

        };
        return service;

        ////////////////

        function getAssignments() {
        	return $http.get('http://localhost:53122/api/Assignments');
        }

        function getAssignmentsById(id) {
            return $http.get('http://localhost:53122/api/Assignments/' + id);
        }

        function postAssignment(assignment) {
            return $http.post('http://localhost:53122/api/Assignments', assignment);
        }
    }
})();