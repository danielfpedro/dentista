angular.module('starter.services', [])

.factory('Dentistas', function(
    store,
    Services,
    $q,
    $timeout
){
    return {
        all: function(){
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
            }, 2000);

            return defer.promise;
        },
        get: function(id){
            var defer = $q.defer();
            $timeout(function(){
                defer.resolve({
                    name: 'Dr. Daniel Cocota',
                    bairro: 'Conforto'
                });
            }, 1000);

            return defer.promise;
        }
    }
})
.factory('User', function(
    facebookConnectPlugin,
    $q,
    store
){
    return {
        doLogin: function(){
            return this.getFacebookToken();
        },
        getAuthUser: function(){

        },
        getFacebookToken: function(){
            var defer = $q.defer();

            facebookConnectPlugin.getAccessToken(function(token) {
                console.log("Token: " + token);
                defer.resolve(token);
            }, function(error){
                defer.resolve(reject);
            });

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
            searchType: 1,
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

            var data = store.get('formFilterData', true);

            if (!data) {
                var defaultServices = this.default;
                defaultServices.services = {};

                angular.forEach(Services.all(), function(value, key){
                    defaultServices.services[key] = true;
                });

                defaultServices.selectedCity = this.cities[0];
                return defaultServices;
            }
            return data;
            
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
