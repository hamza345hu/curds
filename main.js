let title=document.querySelector('.title');
let price=document.querySelector('.price');
let taxes=document.querySelector('.taxes');
let ads=document.querySelector('.ads');
let discount=document.querySelector('.discount');
let total=document.querySelector('.total span');
let count=document.querySelector('.count');
let category=document.querySelector('.category');
let create=document.querySelector('.create');
let table=document.querySelector('table');
let inp=document.querySelectorAll('.inp');

//put event keyup in html .event do to get value of input . value was changing
function getTotal(v) {
    if (price.value != '') {
        let t= (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=t
    }
}
// create and add to local storage
let products=[];
if (localStorage.getItem('products')) {
    products=JSON.parse(localStorage.getItem('products'))
}
let id=1
create.onclick=function () {
    //for check if value of input not equal to ""
    let inputsNotEmpty=[title,price,category].filter((i)=>i.value!="")
    if (inputsNotEmpty.length==3) {
        let c=+count.value;
        let myObj={
            id:id,
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.textContent,
            category:category.value,
        }  
        // count value
        if (c ==0||+ c ==1) {
            id++
            products.push(myObj) 
            console.log(id)    
        }
        else if(c>1){
            for (let i = 0; i < c; i++) {
                id++
                products.push(myObj) 
                console.log(id) 
            }
        }
    }
    //to remove value from inputs
    [title,price,category,taxes,ads,discount,count].forEach(i=> i.value="")
    //add to local storage
    localStorage.setItem('products',JSON.stringify(products))
    
}
console.log(products)
let pStorage=JSON.parse(localStorage.getItem('products')) 

for (let i = 0; i < pStorage.length; i++) {
    let tr=document.createElement('tr')
    let keys=Object.keys(pStorage[i])
    tr.innerHTML=`
    <td>${pStorage[i]["id"]}</td>
    <td>${pStorage[i]["title"]}</td>
    <td>${+pStorage[i]["price"]}</td>
    <td>${+pStorage[i]["taxes"]}</td>
    <td>${+pStorage[i]["ads"]}</td>
    <td>${+pStorage[i]["discount"]}</td>
    <td>${+pStorage[i]["total"]}</td>
    <td>${pStorage[i]["category"]}</td>
    <td></td>
    <td></td>
    `

    // // //console.log(keys)
    // for (let j = 0; j < keys.length; j++) {
    //     let td=document.createElement('td')
    //     td.textContent=(pStorage[i][keys[j]])
    //     tr.appendChild(td)
    // }
    // let update=document.createElement('button')
    // let delete=document.createElement('button')
    table.appendChild(tr)
}


