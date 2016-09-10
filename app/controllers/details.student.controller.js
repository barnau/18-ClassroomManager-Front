(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailsController', StudentDetailsController);

    StudentDetailsController.$inject = ['StudentsFactory', 'ProjectsFactory', 'AssignmentsFactory', '$stateParams', 'toastr'];

    /* @ngInject */
    function StudentDetailsController(StudentsFactory, ProjectsFactory, AssignmentsFactory, $stateParams, toastr) {
        var vm = this;
        vm.title = 'StudentDetailsController';
        vm.test = 'Hello from student details controller';
        vm.studentDetail = {};
        vm.projects = [];
        vm.assignments = [];
        vm.addAssignment = addAssignment;
        vm.editStudent = editStudent;
        vm.changeGrade = changeGrade;
        
        


        vm.studentId = $stateParams.studentId;

        function getStudentDetail(id) {
            StudentsFactory.getStudentDetail(id).then(
                function(response) {
                    vm.studentDetail = response.data;
                }
            );
        }

        function getProjects() {
            ProjectsFactory.getProjects().then(
                function(response) {
                    vm.projects = response.data;
                }
            );
        }

        function getAssignmentsById(id) {
            AssignmentsFactory.getAssignmentsById(id).then(
                function(response) {
                    vm.assignments = response.data;
                }
            );
        }

        function addAssignment() {

            var projId = vm.selectedProject;


            if (projId == undefined) {
                toastr.error("Please select a Project.")
            } else {

                var studId = vm.studentDetail.studentId;
               
                var newAssignment = {
                    "studentId" : studId,
                    "projectId" : projId
                }
               
                
                AssignmentsFactory.postAssignment(newAssignment).then(
                    function() {
                        getStudentDetail(vm.studentDetail.studentId);
                        toastr.success('Assignment was added successfully.', 'Success')
                        getAssignmentsById(vm.studentId);
                    },
                    function(error) {
                       
                         toastr.error('This project is already assigned to you.', 'Error');
                    }
                );

            }

            vm.selectedProject = undefined;
        }

        function editStudent() {
            var toEdit = angular.copy(vm.studentDetail);
            
            var toPut = {
                "firstName" : toEdit.firstName,
                "lastName" : toEdit.lastName,
                "telephone" : toEdit.telephone,
                "email" : toEdit.email
            }
          


            if(toEdit == undefined || toEdit.firstName == undefined || toEdit.lastName == undefined) {
                toastr.error('There were no changes made to be made.')
            } else {
                StudentsFactory.editStudent(vm.studentId, toEdit ).then(
                    function() {
                        toastr.success("Changes made", "Success");
                    },
                    function(error) { 
                        toastr.error(error.statusText);
                    }
                );

            }

        }

        function changeGrade(assignment) {
            var editAssignment = angular.copy(assignment);
           

            editAssignment.grade = assignment.newGrade;

          

            AssignmentsFactory.editAssignment(editAssignment.studentId, editAssignment.projectId, editAssignment).then(
                 function() {
                        toastr.success("Changes made", "Success");
                        getStudentDetail(vm.studentId);
                        assignment.newGrade = "";
                    },
                    function(error) { 
                        toastr.error(error.statusText);
                    }
            );
        }

        getStudentDetail(vm.studentId);
        getProjects();
        getAssignmentsById(vm.studentId);



    }
})();