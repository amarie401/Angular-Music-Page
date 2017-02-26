(function() {
    angular.module('MusikApp').controller('DetailsController', function($stateParams, $q, allData) { // stateParams will give us access to the parameters inside our url
        const musikId = $stateParams.id; // grab the id from our state

        $q.when(allData.get('./src/js/data/songs.json')).then((response) => {
            console.log(response);
            const allSongs = response.data.songs;
            allSongs.forEach((song) => {
                if (song.id === musikId) {
                    this.selectedSong = song;
                }
            });
            console.log(this.selectedSong);
        }).catch((error) => {
            console.log(error);
        });
    });
})();
