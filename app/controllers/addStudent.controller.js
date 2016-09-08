(function() {
    'use strict';

    angular
        .module('app')
        .controller('AddStudentController', AddStudentController);

    AddStudentController.$inject = ['StudentsFactory', 'ProjectsFactory', 'toastr'];

    /* @ngInject */
    function AddStudentController(StudentsFactory, ProjectsFactory, toastr) {
        var vm = this;
        vm.title = 'AddStudentController';
        vm.addStudent = addStudent;

        function addStudent() {
        	var newStud = angular.copy(vm.student);
        	console.log(newStud);

        	if(newStud == undefined || newStud.firstName == undefined || newStud.lastName == undefined || newStud.email == undefined) {
        		toastr.error('Please fill out all fields correctly.', 'Error');
        	} else {
        		StudentsFactory.addStudent(newStud).then(
        			function() {
        				toastr.success("Student added to database.", "Success!");
        			},
        			function(error) {
        				toastr.error("There was a problem adding student to database.", "Error")
        			}
    			)
        	}


        }


      
    }
})();