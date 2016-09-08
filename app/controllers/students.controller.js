(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentsController', StudentsController);

    StudentsController.$inject = ['StudentsFactory', '$stateParams'];

    /* @ngInject */
    function StudentsController(StudentsFactory, $stateParams) {
        var vm = this;
        vm.title = 'StudentsController';
        vm.test = 'this is a test from StudentsController';
        vm.students = [];
        vm.deleteStudent = deleteStudent;
        
        


        function syncLocalToAPI() {

            StudentsFactory.getStudents().then(
                function(response) {
                    vm.students = response.data;
                }
            );
        }

        function deleteStudent(id) {
            
            StudentsFactory.deleteStudent(id).then(
                function() {
                    syncLocalToAPI();
                }
            );

        }

        syncLocalToAPI();

       activate();

        ////////////////

        function activate() {
        }
    }
})();