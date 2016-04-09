// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'starter.controllers',
    'angular-storage',
    'ngCordova'
])

.run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, storeProvider) {
    // $ionicConfigProvider.views.transition('none');

    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html'
            }
        }
    })

    .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })
        .state('app.dentistas', {
            url: '/dentistas',
            views: {
                'menuContent': {
                    templateUrl: 'templates/dentistas.html',
                    controller: 'DentistasController'
                }
            }
        })
        .state('app.favoritos', {
            url: '/favoritos',
            views: {
                'menuContent': {
                    templateUrl: 'templates/favoritos.html',
                    controller: 'FavoritosController'
                }
            }
        })
        .state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'templates/login.html',
                    // controller: 'FavoritosController'
                }
            }
        })

    .state('app.perfil', {
        url: '/perfil',
        views: {
            'menuContent': {
                templateUrl: 'templates/perfil.html',
                controller: 'PerfilController'
            }
        }
    })
    .state('app.perfil2', {
        url: '/perfil2',
        views: {
            'menuContent': {
                templateUrl: 'templates/perfil2.html',
            }
        }
    })
    .state('app.filtro', {
        url: '/filtro',
        views: {
            'menuContent': {
                templateUrl: 'templates/filtro.html',
                controller: 'FiltroController'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/dentistas');
});
