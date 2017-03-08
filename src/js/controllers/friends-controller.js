(function() {
    angular.module('MusikApp').controller('FriendsController', function($state, allData, $q) {

        this.allFriendsArray = [];

        $q.when(allData.get('./src/js/data/friends.json')).then((response) => {
            this.allFriendsArray = response.data.friends;
        }).catch((error) => {
            console.log(error);
        });

    });
})();
