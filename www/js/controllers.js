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
    $ionicModal
) {
    
    $scope.$on('$ionicView.loaded', function(){
        $scope.loading = true;
        $scope.dentistas = [];

        Dentistas
            .get()
            .then(function(data){
                $scope.dentistas = data;
            })
            .finally(function(){
                $scope.loading = false;
            });
    });

    $scope.$on('$ionicView.beforeEnter', function(){
        // var services = Services.all();

        // var filterServicesCount = 0;
        // $scope.servicesSeleted = [];
        // angular.forEach($scope.filterData.services, function(value, key){
        //     if (value) {
        //         $scope.servicesSeleted.push(services[key].name);
        //     }
        // });
        
        // if ($scope.servicesSeleted.length == Services.count()) {
        //     $scope.servicesSeleted = 'Todos os serviços';
        // } else {
        //     $scope.servicesSeleted = $scope.servicesSeleted.join(', ');
        // }
    });


    $ionicModal.fromTemplateUrl('templates/modal/filtro_details.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    $scope.showModalFiltro = function(){
        $scope.filter = {};
        FormFilter.getData().then(function(data){
            $scope.filter = data;
        });
        $scope.services = Services.all();
        $scope.cities = FormFilter.getCities();

        $scope.openModal();

        $scope.modal.show();
    }
    $scope.saveFilter = function(){
        FormFilter.setData($scope.filter);
        $scope.closeModal();
    }
    $scope.cancelFilter = function(){
        $scope.closeModal();
    }

    $scope.doRefresh = function(){
        Dentistas
            .get()
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
.controller('PerfilController', function($scope, $stateParams, $document) {
    // var $el = document.getElementsByClassName('bar');
    // console.log($el[0]);
    // $el[0].className = 'bar bar-clear';
})
.factory('Dentistas', function(
    store,
    Services,
    $q,
    $timeout
){
    return {
        get: function(){
            var defer = $q.defer();
            $timeout(function(){
                defer.resolve({
                    1: {
                        name: 'Dr. Daniel Cocota',
                        bairro: 'Conforto'
                    },
                    2: {
                        name: 'Dr Wesley Safadão',
                        bairro: 'Retiro'
                    }
                });
            }, 1000);

            return defer.promise;
        }
    }
})
.factory('FormFilter', function(
    store,
    Services,
    $q,
    $window
){
    return {
        default: {
            byCity: true,
            byDistance: false,
            distance: 3
        },
        cities: [
            {
                id: 1,
                name: 'Volta Redonda',
            },
            {
                id: 2,
                name: 'Barra Mansa',
            }
        ],
        getCities: function(){
            return this.cities;
        },
        getData: function(){
            var defer = $q.defer();

            var data = angular.fromJson($window.localStorage.getItem('formFilterData'));
            console.log(store.get('formFilterData'));

            if (data) {
                defer.resolve(data);
            } else {
                var defaultServices = this.default;
                defaultServices.services = {};

                angular.forEach(Services.all(), function(value, key){
                    defaultServices.services[key] = true;
                });

                defaultServices.selectedCity = this.cities[0];
                defer.resolve(defaultServices);
            }
            return defer.promise;
            
        },
        setData: function(data){
            store.set('formFilterData', data);
        }
    };
})
.factory('Services', function(){
    return {
        data: {
            1: {
                name: 'Extração de dente',
            },
            2: {
                name: 'Canal',
            },
            3: {
                name: 'Remoção de Placas'
            },
            4: {
                name: 'Restauração'
            },
            5: {
                name: 'Pintura e lavagem'
            }
        },
        all: function(){
            return this.data;
        },
        count: function() {
            var total = 0;
            angular.forEach(this.data, function(){
                total++;
            });
            return total;
        }
    };
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
