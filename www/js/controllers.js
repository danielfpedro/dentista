angular.module('starter.controllers', [])

.directive('fillContentHeight', function($window){
    return {
        restrict: 'C',
        link: function(scope, element, attrs){
            function fillHeight(attrs) {
                var windowH = $window.innerHeight;
                var content = document.getElementsByClassName('scroll-content');
                var scrollBar = document.getElementsByClassName('scroll-bar');
                if (scrollBar.length > 1) {
                  // content[0].removeChild(scrollBar[0]);
                }
                var discount = 54;
                if (eval(attrs.barClear)) {
                    discount = 0;
                    element[0].style.top = 0;
                }
                var finalH = (windowH - discount);
                finalH = (ionic.Platform.isIOS()) ? finalH - 15 : finalH;
                element[0].style.height = finalH + 'px';
            }
            fillHeight(attrs);
            $window.addEventListener("resize", fillHeight);

            // document.getElementsByClassName('scroll')[0].remove();
            ///document.getElementsByClassName('scroll-bar-v')[0].style.visibility = 'hidden';
        }
    };
})

.directive('tey', ['$interval', function($interval) {
    return {
        restrict: 'C',
        link: function(scope, el, attrs) {
            // var h = el[0].offsetWidth;
            // el[0].style.marginTop = -(h / 2) + 'px';
            // console.log(h);
        }
    }
}])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('DentistasController', function(
    $scope,
    $rootScope,
    $ionicActionSheet,
    $state,
    $ionicScrollDelegate,
    $interval,
    $timeout
) {

    $rootScope.barClass = 'bar-positive';

    $scope.dentistas = [
        'Ponte Alta',
        'Ponte Alta',
        'Ponte Alta',
        'Conforto',
        'Conforto',
        'Aterrado',
        'Aterrado',
        'Retiro',
        'Retiro',
        'Retiro',
        'Agua Limpa',
        'Agua Limpa'
    ];

    // $interval(function(){
    //     console.log($ionicScrollDelegate.getScrollPosition())    
    // }, 1000);

    $scope.lastScrollPosition = 0;

    $scope.showSubheader = true;

    var pos;
    $scope.scroll = function(){
        $timeout(function(){
            pos = $ionicScrollDelegate.getScrollPosition().top;
            $scope.showSubheader = (pos > $scope.lastScrollPosition) ? false : true;
            $scope.lastScrollPosition = pos;
            console.log('Current pos: ' + pos);
            console.log('Last pos: ' + $scope.lastScrollPosition);
            console.log('Show subheader? ' + $scope.showSubheader);
            console.log($scope.lastScrollPosition);
        });
    };

    $scope.tey = function(pos){
        console.log('escode');
        $scope.showSubheader = pos;
    }

    $scope.drag = function(pos){
        if ($ionicScrollDelegate.getScrollPosition().top > 0) {
            if (pos == 'up') {
                $scope.showSubheader = false;
            } else {
                $scope.showSubheader = true;
            }
            console.log(pos);
        }
    };
    
    $scope.showNotLoggedinSheet = function() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                {text: '<strong>Fazer Login</strong>'},
            ],
            // destructiveText: 'Delete',
            // titleText: 'Configurações',
            cancelText: 'Fechar',
            cancel: function() {
            // add cancel code..
            },
            buttonClicked: function(index) {
                if (index === 0) {
                    $state.go('app.login');    
                }
                
                return true;
            }
        });

    };

})
.controller('FavoritosController', function($scope, $stateParams) {
    $scope.dentistas = [
        'Ponte Alta',
        'Ponte Alta',
        'Ponte Alta',
        'Conforto',
        'Conforto',
        'Aterrado',
        'Aterrado',
        'Retiro',
    ];
})
.controller('PerfilController', function($scope, $stateParams, $document) {
    // var $el = document.getElementsByClassName('bar');
    // console.log($el[0]);
    // $el[0].className = 'bar bar-clear';
})
.controller('EmptyController', function($scope, $stateParams) {
});
