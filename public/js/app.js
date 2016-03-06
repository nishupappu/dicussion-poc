var app = angular.module('disussionapp', []);
app.controller('nkController', function ($scope, nkService) {
    $scope.heading = "View all questions";
    $scope.addDiscussions = function (dcontent) {
        console.log(dcontent);
        var discobj = {
            Content: dcontent
        };
        nkService.addDiscussion(discobj);
    };
    $scope.deleteDiscussion = function (dqnitem) {
        console.log(dqnitem);
        _.remove($scope.Qns, {"Id": dqnitem.Id});
        var removeobj = {
            Id: dqnitem.Id
        };
        nkService.deleteDiscussion(removeobj);

    };
    var x = nkService.getDiscussions();
    var success = function (resp) {
        console.log(resp.data.Body.list);
        $scope.Qns = resp.data.Body.list;
    };
    var error = function () {
    };
    x.then(success, error);
});
app.service('nkService', function ($http) {
    var makeRequest = function (url, method, data) {
        var promise = $http({url: url, method: method, data: data});
        return promise;

    };
    this.getDiscussions = function () {
        return makeRequest('http://localhost:5654/table/discussions', 'GET', {});

    };
    this.addDiscussion = function (discussionData) {
        return makeRequest('http://localhost:5654/table/discussions', 'POST', discussionData);
    };
    this.deleteDiscussion = function (discussionData) {
        return makeRequest('http://localhost:5654/table/discussions?Id='+discussionData['Id'],'DELETE', discussionData);
    };
    this.updateDiscussion = function (discussionData) {
        return makeRequest('http://localhost:5654/table/discussions', 'POST', discussionData);
    }
});