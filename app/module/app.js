(function() {
    'use strict';

    angular
        .module('app', ['ui.router', 'toastr', 'ngBootbox'])

        .config(function($stateProvider, $urlRouterProvider){
        	$urlRouterProvider.otherwise('/dash');

        	$stateProvider
        	.state('dash', {
        		url: '/dash',
        		templateUrl: '/app/templates/dashboard.html',
        		controller: 'DashboardController as dash'
        	})
        	.state('students', {
        		url: '/students',
        		templateUrl: '/app/templates/students.html',
        		controller: 'StudentsController as studs'
        	})
            .state('students.grid', {
                url: '/grid',
                templateUrl: '/app/templates/studentsGrid.html',
                controller: 'StudentsController as studs'
            })
            .state('students.detail', {
                url: '/detail?studentId',
                templateUrl: '/app/templates/studentDetails.html',
                controller: 'StudentDetailsController as studDetails'

            })

            .state('students.add', {
                url: '/add',
                templateUrl: '/app/templates/studentAdd.html',
                controller: 'AddStudentController as addStud'

            })


            .state('projects', {
                url: '/projects',
                templateUrl: '/app/templates/projects.html',
                controller: 'ProjectsController as proj'
            })

            .state('projects.grid', {
                url :'/grid',
                templateUrl : '/app/templates/projectsGrid.html',
                controller: 'ProjectsController as proj'
            })

            .state('projects.details', {
                url: '/detail?projectId',
                templateUrl: '/app/templates/projectDetails.html',
                controller: 'ProjectDetailsController as projDetail'
            })

            .state('projects.add', {
                url: '/add',
                templateUrl: '/app/templates/projectAdd.html',
                controller: 'AddProjectController as addProj'
            })
        });

})();