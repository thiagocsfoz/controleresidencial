"use strict";

angular.module("OperadoresApp", ['ui.bootstrap', 'ui.router', 'eits-hover', 'eits-default-button', 'eits-sticky'])
    .config( function( $stateProvider , $urlRouterProvider ) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state( 'admin', {
        url         : '/',
        templateUrl : '../resource/authentication?file=templates/login.html',
        controller  : AuthenticationController
    });
});	   
			