(function() {
    'use strict';

    angular
        .module('app')
        .factory('ProjectsFactory', ProjectsFactory);

    ProjectsFactory.$inject = ['$http'];

    /* @ngInject */
    function ProjectsFactory($http) {
        var service = {
            getProjects: getProjects,
            getProjectDetail: getProjectDetail,
            deleteProject: deleteProject,
            addProject: addProject,
            editProject: editProject
        };
        return service;

        ////////////////

        function getProjects() {
        	return $http.get('http://localhost:53122/api/projects');
            
        };

        function getProjectDetail(id) {
            return $http.get('http://localhost:53122/api/projects/' + id);
        }

        function deleteProject(id) {
            return $http.delete('http://localhost:53122/api/projects/' + id);
        }

        function addProject(project) { 
            return $http.post('http://localhost:53122/api/projects', project);
        }

        function editProject(id, project) {
           return $http.put('http://localhost:53122/api/projects/' + id, project);
        }
    }
})();