(function() {
    angular.module('MusikApp').controller('FriendsController', function($state, allData, $q) {

        this.allFriendsArray = [];
        // console.log('in');

        $q.when(allData.get('./src/js/data/friends.json')).then((response) => {
            console.log(response.data.friends);
            this.allFriendsArray = response.data.friends; // set array to the response.data
            // console.log(this.allFriendsArray);
        }).catch((error) => {
            console.log(error);
        });

    });
})();
