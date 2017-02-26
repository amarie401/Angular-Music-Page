'use strict';

(function () {
    angular.module('MusikApp', ['ui.router', 'LocalStorageModule']);

    angular.module('MusikApp').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('MusikParent', { // default home url
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
        }).state('MusikParent.songs', { // login template
            url: 'songs',
            templateUrl: './templates/songs.html',
            controller: "SongsController as songsCtrl"
        }).state('MusikParent.friends', {
            url: 'friends',
            templateUrl: './templates/friends.html',
            controller: "FriendsController as friendsCtrl"
        }).state('MusikParent.details', {
            url: 'song-details/:id', //  url accepts a parameter called id that will be dynamic
            templateUrl: './templates/songs-details.html',
            controller: 'DetailsController as detailsCtrl'
        });
    });
})();
'use strict';

(function () {
    angular.module('MusikApp').controller('DetailsController', function ($stateParams, $q, allData) {
        var _this = this;

        // stateParams will give us access to the parameters inside our url
        var musikId = $stateParams.id; // grab the id from our state

        $q.when(allData.get('./src/js/data/songs.json')).then(function (response) {
            console.log(response);
            var allSongs = response.data.songs;
            allSongs.forEach(function (song) {
                if (song.id === musikId) {
                    _this.selectedSong = song;
                }
            });
            console.log(_this.selectedSong);
        }).catch(function (error) {
            console.log(error);
        });
    });
})();
'use strict';

(function () {
    angular.module('MusikApp').controller('FriendsController', function ($state, allData, $q) {
        var _this = this;

        this.allFriendsArray = [];
        // console.log('in');

        $q.when(allData.get('./src/js/data/friends.json')).then(function (response) {
            console.log(response.data.friends);
            _this.allFriendsArray = response.data.friends; // set array to the response.data
            // console.log(this.allFriendsArray);
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
        // console.log('in');

        $q.when(allData.get('./src/js/data/songs.json')).then(function (response) {
            console.log(response.data.songs);
            _this.allSongsArray = response.data.songs; // set array to the response.data
            // this.allSongsArray = this.getSongs(); // set array to getSongs function
            console.log(_this.allSongsArray);
        }).catch(function (error) {
            console.log(error);
        });
    });
})();
'use strict';

(function () {
    angular.module('MusikApp').controller("LoginController", function ($location, $state, localStorageService) {
        this.userInfo = []; // store userInfo array
        console.log('in');
        this.inputInfo = { // inputinfo obj
            userName: '',
            passWord: ''
        };

        this.submit = function () {
            // submit function
            this.userInfo.push(this.inputInfo); // push inputInfo in userInfo array
            this.setInfo(this.userInfo); // pass userInfo in setInfo function
            this.userinfo = this.getInfo(); // set userinfo to getInfo function
            console.log(this.getInfo()[0].userName);
            $state.go('MusikParent.home');
        };

        this.setInfo = function (userInfo, data) {
            // set local storage
            localStorageService.set('userInfo', this.userInfo);
        };

        this.getInfo = function () {
            // get local storage
            return localStorageService.get('userInfo') || [];
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