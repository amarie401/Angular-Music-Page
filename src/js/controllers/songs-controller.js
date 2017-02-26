(function() {
    angular.module('MusikApp').controller('SongsController', function($state, allData, $q) {
        this.allSongsArray = [];
        // console.log('in');

        $q.when(allData.get('./src/js/data/songs.json')).then((response) => {
            console.log(response.data.songs);
            this.allSongsArray = response.data.songs; // set array to the response.data
            // this.allSongsArray = this.getSongs(); // set array to getSongs function
            console.log(this.allSongsArray);
        }).catch((error) => {
            console.log(error);
        });
    });
})();
