"use strict";

var myapp = angular.module("ControleApp", ['ui.bootstrap', 'ngGrid', 'eits-grid-resize', 'ui.router', 'eits-hover', 'eits-grid', 'eits-default-button', 'eits-alert', 'eits-sticky', 'ngSanitize', 'ui.date', 'eits-slick', 'localytics.directives','eits-numbers-only', 'eits-editable', 'ui.sortable','eits-timepickerPop','eits-trust-html'])
    .config( function( $stateProvider , $urlRouterProvider ) {

        $urlRouterProvider.otherwise("/");

        //Admin
        $stateProvider.state('admin', {
            url : "",
            templateUrl : "bundles/appadmin/templates/view.html",
            controller : AdminController
        })
        .state('admin.listar', {
            url: "/"
        })
        .state('admin.user.new', {
            url: "/user/new"
        })
        .state('admin.user.edit', {
            url: "/user/edit/:id"
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
    });