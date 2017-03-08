(function() {
    angular.module('MusikApp').controller('DetailsController', function($stateParams, $q, allData) {
        const musikId = $stateParams.id;

        $q.when(allData.get('./src/js/data/songs.json')).then((response) => {
            const allSongs = response.data.songs;
            allSongs.forEach((song) => {
                if (song.id === musikId) {
                    this.selectedSong = song;
                }
            });
        }).catch((error) => {
        });
    });
})();
