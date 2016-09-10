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

        var projects = [];

        function syncLocalToApi() {
            ProjectsFactory.getProjects().then(
                function(response) {
                    projects = response.data;
                }
            );
        }


        function projectExists(project) {


            var exists = false;

            projects.forEach(function(proj) {

                if (project.name.toLowerCase() == proj.name.toLowerCase()) {

                    exists = true;
                }

            })
            
            return exists;

        }



        function addProject(project) {

            var newProj = angular.copy(project);

            if (newProj == undefined || newProj.name == undefined || newProj.description == undefined) {
                toastr.error('Please fill out all fields correctly.', 'Error');
            } else if (projectExists(newProj)) {
                toastr.error('That project already exists in database');
            } else {

                ProjectsFactory.addProject(project).then(
                    function() {
                        toastr.success("Project added to database.", "Success!");
                        project.name = "";
                        project.description = "";
                    },
                    function(error) {
                        toastr.error("There was a problem adding project to database.", "Error")
                    }

                );
            }
        }

        syncLocalToApi();

    }
})();
