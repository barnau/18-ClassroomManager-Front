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
            console.log(projId);
            var studId = vm.studentDetail.studentId;
            console.log(studId);
            var newAssignment = {
                "studentId" : studId,
                "projectId" : projId
            }
            console.log(newAssignment);
            
            AssignmentsFactory.postAssignment(newAssignment).then(
                function() {
                    getStudentDetail(vm.studentDetail.studentId);
                    toastr.success('Assignment was added successfully.', 'Success')
                },
                function(error) {
                    console.log(error);
                     toastr.error('This project is already assigned to you.', 'Error');
                }
            );
        }

        function editStudent() {
            var toEdit = angular.copy(vm.studentDetail);
            console.log(toEdit);
            var toPut = {
                "firstName" : toEdit.firstName,
                "lastName" : toEdit.lastName,
                "telephone" : toEdit.telephone,
                "email" : toEdit.email
            }
            console.log(toPut);


            


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


        getStudentDetail(vm.studentId);
        getProjects();
        getAssignmentsById(vm.studentId);



        
        

        activate();

        ////////////////

        function activate() {
        }
    }
})();