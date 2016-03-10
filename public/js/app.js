var app = angular.module('discussionapp', ['ngRoute']);
app.controller('nkController', function ($scope, nkService) {
    $scope.mainheading="Ask Questions";
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
        $scope.Qns.map(function(qn){ 
            qn.answersCount = _.filter($scope.Qns, {"ParentId": qn.Id }).length;
        });
    };
    var error = function () {
    };
    x.then(success, error);
});

app.controller('qnDetailController', function ($scope,$routeParams,nkService) {
    console.log('params:',$routeParams.qnId)
    var x = nkService.getDiscussions();
    var success = function (resp) {
        console.log(resp.data.Body.list);
       var qns = resp.data.Body.list;
        var selectedqn= _.filter(qns, function (f) {
            return f.Id==$routeParams.qnId;
        });
        $scope.questionContent=selectedqn[0].Content;
        if(selectedqn[0]){
            console.log(selectedqn[0].Views)
            selectedqn[0].Views=selectedqn[0].Views?parseInt(selectedqn[0].Views)+1:1;
            nkService.updateDiscussion(selectedqn[0]);
        }
        $scope.answers = _.filter(qns, function ( f ) {
            return f.ParentId==$routeParams.qnId;
        });
    };
    var error = function () {
    };
    x.then(success, error);
    $scope.addAnswer=function(dcomment){
        var discobj = {
            Content: dcomment,
            ParentId:$routeParams.qnId
        };
        console.log(discobj.Content);
        nkService.addDiscussion(discobj).then(function(){
            $scope.comment="";
            nkService.getDiscussions().then(function(resp){
                 var qns = resp.data.Body.list;
                 $scope.answers = _.filter(qns, function ( f ) {
                    return f.ParentId==$routeParams.qnId;
                });
            });

        });
    };
});

app.controller('loginController',function($scope,nkService){

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
    };
    this.addUser=function(userobj){
        return makeRequest()
    }
});
