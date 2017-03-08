(function() {
    angular.module('MusikApp').controller("LoginController", function($location, $state, localStorageService) {

        this.getInfo = function() {
            return localStorageService.get('userInfo') || [];
        };

        this.getCurrentUser = function() {
            return this.getInfo();
        };

        this.logOut = function() {
            localStorageService.clearAll();
            $state.go('MusikParent.index');
        };

        this.userInfo = this.getInfo();

        this.inputInfo = {
            userName: '',
            passWord: ''
        };

        this.submit = function() {
            this.userInfo.push(this.inputInfo);
            this.setInfo(this.userInfo);
            this.userinfo = this.getInfo();
            console.log(this.getInfo()[0].userName);
            $state.go('MusikParent.home');
        };

        this.setInfo = function(userInfo) {
            localStorageService.set('userInfo', this.userInfo);
        };

    });
})();
