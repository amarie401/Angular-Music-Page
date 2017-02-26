(function() {
    angular.module('MusikApp', ['ui.router', 'LocalStorageModule']);

    angular.module('MusikApp').config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('MusikParent', { // default home url
            url: '/',
            abstract: true,
            template: '<ui-view></ui-view>',
        }).state('MusikParent.index', {
            url: '',
            templateUrl: './templates/login.html',
            controller: "LoginController as login"
        }).state('MusikParent.home', {
            url: 'home',
            templateUrl: './templates/home.html',
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
