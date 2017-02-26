(function() {
    angular.module('MusikApp').controller("LoginController", function($location, $state, localStorageService) {
        this.userInfo = []; // store userInfo array
        console.log('in');
        this.inputInfo = { // inputinfo obj
            userName: '',
            passWord: '',
        };

        this.submit = function() { // submit function
            this.userInfo.push(this.inputInfo); // push inputInfo in userInfo array
            this.setInfo(this.userInfo); // pass userInfo in setInfo function
            this.userinfo = this.getInfo(); // set userinfo to getInfo function
            console.log(this.getInfo()[0].userName);
            $state.go('MusikParent.home');
        };

        this.setInfo = function(userInfo, data) { // set local storage
            localStorageService.set('userInfo', this.userInfo);
        };

        this.getInfo = function() { // get local storage
            return localStorageService.get('userInfo') || [];
        };
    });
})();
