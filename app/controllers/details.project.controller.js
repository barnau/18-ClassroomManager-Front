(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProjectDetailsController', ProjectDetailsController);

    ProjectDetailsController.$inject = ['ProjectsFactory', 'StudentsFactory',  'AssignmentsFactory','$stateParams', 'toastr'];

    /* @ngInject */
    function ProjectDetailsController(ProjectsFactory, StudentsFactory, AssignmentsFactory, $stateParams, toastr) {
        var vm = this;
        vm.title = 'ProjectDetailsController';
        vm.projectDetails ={};
        vm.students = [];

        vm.projectId = $stateParams.projectId;
        vm.assignStudent = assignStudent;
        vm.editProject = editProject;

        
       
        function getProjectDetail(id) {
            ProjectsFactory.getProjectDetail(id).then(
                function(response) {
                    vm.projectDetails = response.data;
                },
                function(error) {
                    toastr.error(error.statusText, "Fetch error");
                }
            );
        }

        function assignStudent() {

            var studId = vm.selectedStudent;
            
            if(studId == undefined) {
                toastr.error('Please select a student.');
            } else {

               
                var projId = vm.projectId;

                var newAssignment = {
                    "studentId" : studId,
                    "projectId" : projId
                }
                
                AssignmentsFactory.postAssignment(newAssignment).then(
                    function() {
                        getProjectDetail(vm.projectId);
                        toastr.success('Assignment was added successfully.', 'Success');
                        getProjectDetail(vm.projectId);
                    },
                    function(error) {
                        
                         toastr.error('This project is already assigned to you.', 'Error');
                    }
                );
                vm.selectedStudent = undefined;
            }
        }

        

        function getStudents() {
            StudentsFactory.getStudents().then(
                function(response) {
                    vm.students = response.data;
                }
            );
        }

        function editProject() {
            var toEdit = angular.copy(vm.projectDetails);

            if(toEdit == undefined || toEdit.description == undefined || toEdit.name == undefined) {
                toastr.error('There were no changes made to be made.')
            } else {
                ProjectsFactory.editProject(vm.projectId, toEdit ).then(
                    function() {
                        toastr.success("Changes made", "Success");
                    },
                    function(error) { 
                        toastr.error(error.statusText);
                    }
                );

            }

        }

        getStudents();
        getProjectDetail(vm.projectId);

    }
})();