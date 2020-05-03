const jsonurl="shoppinglist.json";
const btn=document.querySelector("button");
const table=document.querySelector('table ');
const select=document.getElementById('filter');
const span=document.querySelector('span');
let data;
//Ajax request to get json file
function getJson(url,callback){
 const xhr=new XMLHttpRequest();//xhr request 
 xhr.open('GET',url); 
 xhr.onload=()=>{   
    if(xhr.status===200){
         data=JSON.parse(xhr.responseText);
        callback(data);
    }

 };
 xhr.send();
}
/**
 * generates html required for table using json data
 * @param  {array} data  json data
 */
function generateHTML(data){
    //function to generate html for table 
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
    table.innerHTML=html;// adding html generated into tbody
}

btn.addEventListener('click', (e)=>{
 getJson(jsonurl,generateHTML);// getting json data and generating html
 span.style.display="block";// display select options 
 e.target.remove();// remove button 
});

select.addEventListener('change',()=>{
    /* on changing filter option filter json data 
    according to type of data*/
    generateHTML(filter(data,select.value));
   
});
/**
 * filter json data
 * @param  {array} json first argument
 * @param  {string} department The second argument
 * @return {array}   filtered json
 */
// function to filter json data 
function filter(json,department){
    // filter json if it's all then  just return json data as it is
    if (department.toLowerCase()==="all"){
        return json;
    }
    // otherwise filter according to deparment chosen
     return json.filter(i=> i["Department"].toLowerCase()==department.toLowerCase());
    
}

