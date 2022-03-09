function search() {
    var result = new URLSearchParams(window.location.search).get(param);
    console.log(result)
}

var results = document.querySelector(".results")
fetch('https://api.nutritionix.com/v1_1/search/rice?results=0:20&fields=item_name,nf_calories,nf_protein&appId=a95b7d99&appKey=8bf17b6d7a5e249e89f5b57612de880b')
    .then(response => response.json())
    .then(data => console.log(data));