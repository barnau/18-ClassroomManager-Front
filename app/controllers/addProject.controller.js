(function() {
    'use strict';

    angular
        .module('app')
        .controller('AddProjectController', AddProjectController);

    AddProjectController.$inject = ['ProjectsFactory', 'toastr'];

    /* @ngInject */
    function AddProjectController(ProjectsFactory, toastr) {
        var vm = this;
        vm.title = 'AddProjectController';
        vm.addProject = addProject;

        function addProject(project) {

            var newProj = angular.copy(project);
            


            if(newProj == undefined || newProj.name == undefined || newProj.description == undefined) {
                toastr.error('Please fill out all fields correctly.', 'Error');
            } else {

                ProjectsFactory.addProject(project).then(
                    function() {
                        toastr.success("Project added to database.", "Success!");
                    },
                    function(error) {
                        toastr.error("There was a problem adding project to database.", "Error")
                    }

                );
            }

        }
    }
})();