
MarvelService = function MarvelService() {
    var key = '?apikey=e44062bbc76b37176b08325d5265a0f3';
    var baseUrl = 'http://gateway.marvel.com/v1/public/'

    var marvelCharacters = []
    var myTeam = []

    // stringify this later
    this.getMyTeam = function() {
        return JSON.parse(JSON.stringify(myTeam))
    }

    this.addToTeam = function(id) {
        var data = JSON.parse(localStorage.getItem('MarvelData'))
        var character = data.find( character => character.id === id)
        if (!myTeam.find( character => character.id === id) && myTeam.length < 6) {
            myTeam.push(character)
        }
    }

    this.removeFromTeam = function(id) {
        var character = myTeam.find( character => character.id === id)
        if (character) {
            var charIndexInArray = myTeam.indexOf(character)
            myTeam.splice(charIndexInArray, 1)
        }
    }

    this.getCharacters = function (callWhenDone) {
        var data = localStorage.getItem('MarvelData')
        if (data) {
            marvelCharacters = JSON.parse(data);
            return callWhenDone(marvelCharacters)
        }
        $.get(baseUrl + 'characters' + key, function (response) {
            localStorage.setItem('MarvelData', JSON.stringify(response.data.results))
            marvelCharacters = response.data.results;
            callWhenDone(marvelCharacters)
        })
    }

}