(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['StudentsFactory', 'ProjectsFactory', 'AssignmentsFactory', 'DashboardFactory','$stateParams'];

    /* @ngInject */
    function DashboardController(StudentsFactory, ProjectsFactory, AssignmentsFactory, DashboardFactory, $stateParams) {
        var vm = this;
        vm.title = 'DashboardController';
        vm.test = 'this is a test from DashboardController';
        vm.dashInfo = {};

        function syncControllerToApi() {
            DashboardFactory.getDashboardInfo().then(
                function(response) {
                    vm.dashInfo = response.data;
                }
            );
        }

        syncControllerToApi();

       
        


        
        
        
        activate();

        ////////////////

        function activate() {
        }
    }
})();