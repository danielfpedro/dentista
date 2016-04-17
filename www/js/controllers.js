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
                    console.log('Aqui');
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
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    $scope.go = function(path) {
        $state.go(path);
    };
})

.controller('DentistasController', function(
    $scope,
    $rootScope,
    $ionicActionSheet,
    $state,
    $ionicScrollDelegate,
    $interval,
    $timeout,
    Services,
    FormFilter,
    $ionicLoading,
    Dentistas,
    $ionicPopup,
    $ionicModal,
    store,
    $cordovaDialogs
) {
    
    $scope.$on('$ionicView.loaded', function(){
        $scope.loading = true;
        $scope.dentistas = [];

        Dentistas
            .all()
            .then(function(data){
                $scope.dentistas = data;
            })
            .finally(function(){
                $scope.loading = false;
            });

        $scope.services = Services.all();
        $scope.cities = FormFilter.getCities();

        $scope.filter = FormFilter.getData();

        $scope.filterSelectedValues();

    });

    $scope.filterSelectedValues = function(){
        $scope.servicesSeleted = [];
        var filterServicesCount = 0;
        angular.forEach($scope.filter.services, function(value, key){
            if (value) {
                $scope.servicesSeleted.push($scope.services[key].name);
            }
        });
        
        if ($scope.servicesSeleted.length == Services.count()) {
            $scope.servicesSeleted = 'Todos os serviços';
        } else {
            $scope.servicesSeleted = $scope.servicesSeleted.join(', ');
        }
    }

    $scope.$on('$ionicView.beforeEnter', function(){
    });


    $ionicModal.fromTemplateUrl('templates/modal/filtro_details.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.$on('modal.hidden', function() {

    });

    $scope.onCloseModal = function() {
        $scope.filter = FormFilter.getData();
        $scope.filterSelectedValues();
    }

    $scope.setSearchType = function(value){
        $scope.filter.searchType = value;
    }

    $scope.showModalFiltro = function(){
        $scope.filterOnOpenState = FormFilter.getData();
        $scope.modal.show();
    }
    $scope.saveFilter = function(){
        FormFilter.setData($scope.filter);
        
        $scope.loading = true;
        Dentistas
            .all()
            .then(function(data){
                $scope.dentistas = data;
            })
            .finally(function(){
                $scope.loading = false;
            });

        $scope.modal.hide();
    }
    $scope.cancelFilter = function(){
        if (!angular.equals($scope.filterOnOpenState, $scope.filter)) {

            $cordovaDialogs
                .confirm('Cancelando todas as alterações do filtro não serão salvas.', 'Deseja realmente cancelar?', ['Sim', 'Não'])
                .then(function(buttonIndex) {
                    // no button = 0, 'OK' = 1, 'Cancel' = 2
                    var btnIndex = buttonIndex;
                    if (btnIndex === 1) {
                        $scope.onCloseModal();    
                        $scope.modal.hide();
                    }
                });            
        } else {
            $scope.modal.hide();
        }
        
    }

    $scope.doRefresh = function(){
        Dentistas
            .all()
            .then(function(data){
                $scope.dentistas = data;
            })
            .finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    $scope.lastScrollPosition = 0;

    $scope.showSubheader = false;

    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop();
    }

    var pos;
    $scope.scroll = function(){
        $timeout(function(){
            pos = $ionicScrollDelegate.getScrollPosition().top;
            if ((pos) > $scope.lastScrollPosition || pos < 2) {
                $scope.showSubheader = false;
            } else {
                $scope.showSubheader = true;
            }

            $scope.lastScrollPosition = pos;
            // console.log('Current pos: ' + pos);
            // console.log('Last pos: ' + $scope.lastScrollPosition);
            // console.log('Show subheader? ' + $scope.showSubheader);
            // console.log($scope.lastScrollPosition);
        });
    };

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
.controller('PerfilController', function(
    $scope,
    $stateParams,
    $document,
    Dentistas
) {
    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.dentista = null;

        var id = $stateParams.id;
        Dentistas
            .get(id)
            .then(function(data){
                $scope.dentista = data;
            });
    });
})
.controller('LoginController', function(
    $scope,
    User
) {
    $scope.doLogin = function(){
        User.doLogin();
    }
})
.controller('FiltroController', function(
    $scope,
    $stateParams,
    FormFilter,
    Services,
    $timeout
) {

})
.controller('EmptyController', function($scope, $stateParams) {
});
