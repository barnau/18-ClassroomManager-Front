(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['ProjectsFactory', '$stateParams'];

    /* @ngInject */
    function ProjectsController(ProjectsFactory, $stateParams) {
        var vm = this;
        vm.title = 'ProjectsController';
        vm.test = 'this is a test from ProjectsController';
        vm.projects = [];
        vm.deleteStudent = deleteStudent;

        function syncLocalToApi() {
            ProjectsFactory.getProjects().then(
                function(response) {
                    vm.projects = response.data;
                }
            );
        }

        function deleteStudent(id) {
           ProjectsFactory.deleteProject(id).then(
                function() {
                    syncLocalToApi();
                }
            );
           
        }

        syncLocalToApi();

        activate();

        ////////////////

        function activate() {
        }
    }
})();