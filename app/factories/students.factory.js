(function() {
    'use strict';

    angular
        .module('app')
        .factory('StudentsFactory', StudentsFactory);

    StudentsFactory.$inject = ['$http'];

    /* @ngInject */
    function StudentsFactory($http) {
        var service = {
            getStudents: getStudents,
            getStudentDetail: getStudentDetail,
            deleteStudent: deleteStudent,
            addStudent: addStudent,
            editStudent: editStudent
           
        };
        return service;

        ////////////////
        

        function getStudents() {
        	return $http.get('http://localhost:53122/api/students');
            
        };

        function getStudentDetail(id) {
            return $http.get('http://localhost:53122/api/students/' + id);
        }

        function deleteStudent(id) {
            return $http.delete('http://localhost:53122/api/students/' + id);
        }

        function addStudent(student) { 
            return $http.post('http://localhost:53122/api/students', student);
        }

        function editStudent(id, student) {
           return $http.put('http://localhost:53122/api/students/' + id, student);
        }

        




        /*function getMovieDetailData(title) {
           // return $http.get('http://www.omdbapi.com/?t=' + title + '&r=json&type=movie');
        }*/
    }
})();