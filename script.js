const jsonurl="shoppinglist.json";
const wikiurl="";
const btn=document.querySelector("button");
const table=document.querySelector('table ');
const select=document.getElementById('filter');
const span=document.querySelector('span');
let data;
//Ajax request to get json file
function getJson(url,callback){
 const xhr=new XMLHttpRequest();
 xhr.open('GET',url);
 xhr.onload=()=>{
    if(xhr.status===200){
         data=JSON.parse(xhr.responseText);
        callback(data);
    }

 };
 xhr.send();
}

function generateHTML(data){
    
    let html=`<thead>`;
    html+=`<tr>`;
    html+=`<th>Serial number</th>`;
    html+=`<th>Name</th>`;
    html+=`<th>Quantity</th>`;
    html+=`<th>Unit</th>`;
    html+=`<th>Department</th>`;
    html+=`<th>Notes</th>`;
    html+=`</th>`;
    html+=`</thead>`;
    html+=`<tbody>`;
    data.forEach( (item)=>{
          html+=`<tr>`;
          html+=`<td>${item["Serial number"]}</td>`;
          html+=`<td>${item["Name"]}</td>`;
          html+=`<td>${item["Quantity"]}</td>`;
          html+=`<td>${item["Unit"]}</td>`;
          html+=`<td>${item["Department"]}</td>`;
          html+=`<td>${item["Notes"]}</td>`;
          html+=`</tr>`;
    }
    );
    html+='</tbody>';
    table.innerHTML=html;
}

btn.addEventListener('click', (e)=>{
 getJson(jsonurl,generateHTML);
 span.style.display="block";
 e.target.remove();
});

select.addEventListener('change',()=>{
    generateHTML(filter(data,select.value));
   
});


function filter(json,department){
    if (department.toLowerCase()==="all"){
        return json;
    }
     return json.filter(i=> i["Department"].toLowerCase()==department.toLowerCase())
}

