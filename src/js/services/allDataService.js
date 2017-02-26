(function() {
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
