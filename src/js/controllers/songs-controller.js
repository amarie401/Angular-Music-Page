(function() {
    angular.module('MusikApp').controller('SongsController', function($state, allData, $q) {
        this.allSongsArray = [];
        this.reverseSort = false;
        this.orderByField = 'year';

        $q.when(allData.get('./src/js/data/songs.json')).then((response) => {
            this.allSongsArray = response.data.songs;
        }).catch((error) => {
            console.log(error);
        });
    });
})();
