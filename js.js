console.log("hello");

function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let addedParamsCount = 0;

let parameterBox = document.getElementById('parametersBox');
parameterBox.style.display = 'none';

let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', ()=> {
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';
})


let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', ()=> {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=> {
    let params = document.getElementById('params');
    let string = `<div id="parametersBox" class="form-group mb-3 row my-2">

    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
    </div>
    <br><br>
    <button class="btn btn-primary deleteParam"> - </button>
</div>

    `;
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam){
        item.addEventListener('click', (e)=> {
            e.target.parentElement.remove();
        })
    }
    addedParamsCount++;
})

let submit = document.getElementById('submit');
submit.addEventListener('click', ()=> {
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

    let url = document.getElementById("urlField").value;
    let requestType = document.querySelector("input[name='reqType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    
    if(contentType == 'params'){
        data= {};
        for(i=0;i<addedParamsCount+1;i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
            let key = document.getElementById('parameterKey' + (i+1)).value;
            let value = document.getElementById('parameterKey' + (i+1)).value;
            data[key]= value;
            }
            data = JSON.stringify(data);
        }
    }

    else{
        data = document.getElementById('requestJsonText').value;
    }

    if(requestType == 'GET'){
        fetch(url, {
            method: 'GET'
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });

    }
    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();
        });

    }

})