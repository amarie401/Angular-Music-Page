'use strict';

(function () {
    angular.module('MusikApp', ['ui.router', 'LocalStorageModule']);

    angular.module('MusikApp').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('MusikParent', {
            url: '/',
            abstract: true,
            template: '<ui-view></ui-view>'
        }).state('MusikParent.index', {
            url: '',
            templateUrl: './templates/login.html',
            controller: "LoginController as login"
        }).state('MusikParent.home', {
            url: 'home',
            templateUrl: './templates/home.html'
        }).state('MusikParent.songs', {
            url: 'songs',
            templateUrl: './templates/songs.html',
            controller: "SongsController as songsCtrl"
        }).state('MusikParent.friends', {
            url: 'friends',
            templateUrl: './templates/friends.html',
            controller: "FriendsController as friendsCtrl"
        }).state('MusikParent.details', {
            url: 'song-details/:id',
            templateUrl: './templates/songs-details.html',
            controller: 'DetailsController as detailsCtrl'
        });
    });
})();
'use strict';

(function () {
    angular.module('MusikApp').controller('DetailsController', function ($stateParams, $q, allData) {
        var _this = this;

        var musikId = $stateParams.id;

        $q.when(allData.get('./src/js/data/songs.json')).then(function (response) {
            var allSongs = response.data.songs;
            allSongs.forEach(function (song) {
                if (song.id === musikId) {
                    _this.selectedSong = song;
                }
            });
        }).catch(function (error) {});
    });
})();
'use strict';

(function () {
    angular.module('MusikApp').controller('FriendsController', function ($state, allData, $q) {
        var _this = this;

        this.allFriendsArray = [];

        $q.when(allData.get('./src/js/data/friends.json')).then(function (response) {
            _this.allFriendsArray = response.data.friends;
        }).catch(function (error) {
            console.log(error);
        });
    });
})();
'use strict';

(function () {
    angular.module('MusikApp').controller('SongsController', function ($state, allData, $q) {
        var _this = this;

        this.allSongsArray = [];
        this.reverseSort = false;
        this.orderByField = 'year';

        $q.when(allData.get('./src/js/data/songs.json')).then(function (response) {
            _this.allSongsArray = response.data.songs;
        }).catch(function (error) {
            console.log(error);
        });
    });
})();
'use strict';

(function () {
    angular.module('MusikApp').controller("LoginController", function ($location, $state, localStorageService) {

        this.getInfo = function () {
            return localStorageService.get('userInfo') || [];
        };

        this.getCurrentUser = function () {
            return this.getInfo();
        };

        this.logOut = function () {
            localStorageService.clearAll();
            $state.go('MusikParent.index');
        };

        this.userInfo = this.getInfo();

        this.inputInfo = {
            userName: '',
            passWord: ''
        };

        this.submit = function () {
            this.userInfo.push(this.inputInfo);
            this.setInfo(this.userInfo);
            this.userinfo = this.getInfo();
            console.log(this.getInfo()[0].userName);
            $state.go('MusikParent.home');
        };

        this.setInfo = function (userInfo) {
            localStorageService.set('userInfo', this.userInfo);
        };
    });
})();
'use strict';

(function () {
    angular.module('MusikApp').service('allData', AllDataService);

    function AllDataService($http) {
        function getData(url) {
            return $http({
                method: 'GET',
                url: url // pass in url
            });
        }

        return {
            get: getData // revealing module pattern
        };
    }
})();