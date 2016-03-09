/**
 * Created by nishak on 3/6/2016.
 */
app.config(function($routeProvider) {
    console.log("test");
    $routeProvider.when('/', {templateUrl: 'home.html', controller:'nkController'})
        .when('/questions/:qnId',{templateUrl:'questiondetail.html',controller:'qnDetailController'})
});