"use strict";


var myapp = angular.module("ControleApp", ['ui.bootstrap', 'ngGrid', 'eits-grid-resize', 'ui.router', 'eits-hover', 'eits-grid', 'eits-default-button', 'eits-alert', 'eits-sticky', 'ngSanitize', 'ui.date', 'eits-slick', 'localytics.directives','eits-numbers-only', 'eits-editable', 'ui.sortable','eits-timepickerPop'])

    .config( function( $stateProvider , $urlRouterProvider ) {

        $urlRouterProvider.otherwise("/");

        $stateProvider.state('dashboard', {
            url : "/",
            templateUrl : "bundles/appcontrole/templates/dashboard/view.html",
            controller : DashboardController
        })
        .state('dashboard.listar', {
            url: ""
        });

        $stateProvider.state('iluminacao', {
            url : "/iluminacao",
            templateUrl : "bundles/appcontrole/templates/iluminacao/view.html",
            controller : IluminacaoController
        })
        .state('iluminacao.controle', {
            url: "/controle"
        })
        .state('iluminacao.perfis', {
            url: "/perfis"
        })
        .state('iluminacao.rotinas', {
            url: "/rotinas"
        });

    }).constant('paginationConfig', {
        itemsPerPage: 10,
        maxSize:5,
        boundaryLinks: false,
        directionLinks: true,
        firstText: "<i class='icon-fast-backward'></i>",
        previousText: "<i class='icon-backward'></i>",
        nextText: "<i class='icon-forward'></i>",
        lastText: "<i class='icon-fast-forward'></i>",
        rotate: true
    }).constant('uiDateConfig', {
        yearRange: new Date().getFullYear() + ":" + (new Date().getFullYear() + 20 )
    }).service('FayeClient', function () {
        return new Faye.Client('http://localhost:3000/');
    }).run(function ($rootScope, FayeClient) {
        FayeClient.subscribe('/iluminacao-controle', function (data) {
            $rootScope.$broadcast('controleIluminacao', data);
        });
    })