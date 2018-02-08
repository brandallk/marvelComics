
MarvelController = function MarvelController(){
    var marvelService = new MarvelService()

    //Private
    function getCharacters(){
        marvelService.getCharacters(drawMarvel)
    }

    function drawMarvel(arr){
        // console.log(arr)
        var template = ''
        var marvelElem = document.getElementById("marvel-characters")
        for(var i = 0; i < arr.length; i++) {
            var char = arr[i]
            char.description = char.description ? char.description : 'No Description Avalable'
            template += `
            <div class="col-4">
                <img src="${char.thumbnail.path + '.' + char.thumbnail.extension}" alt="">
                <h4><b>Name:</b> ${char.name}</h4>
                <p><b>Description:</b> ${char.description}</p>
                <p><b>Comic Appearances:</b>${char.comics.available}</p>
                <button class="btn btn-success" onclick="app.controllers.marvelCtrl.addToTeam(${char.id})">Add to team</button>
            </div>
            `
    }
    marvelElem.innerHTML = template
}

function drawMyTeam(team) {
    var innerHtml = ""

    team.forEach( member => {
        var template = `
            <div class="col-4 py-3">
                <img src="${member.thumbnail.path + '.' + member.thumbnail.extension}" alt="character image">
                <h6>${member.name}</h6>
                <button class="btn btn-danger" onclick="app.controllers.marvelCtrl.removeFromTeam(${member.id})">Remove from team</button>
            </div>
        `
        innerHtml += template
    })

    document.querySelector("div#my-team").innerHTML = innerHtml
}

function getMyTeam() {
    return marvelService.getMyTeam()
}

//Public

this.addToTeam = function addToTeam(id) {
    marvelService.addToTeam(id)
    drawMyTeam(getMyTeam())
}

this.removeFromTeam = function removeFromTeam(id) {
    marvelService.removeFromTeam(id)
    drawMyTeam(getMyTeam())
}

getCharacters()

}