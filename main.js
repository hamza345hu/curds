let title=document.querySelector('.title');
let price=document.querySelector('.price');
let taxes=document.querySelector('.taxes');
let ads=document.querySelector('.ads');
let discount=document.querySelector('.discount');
let total=document.querySelector('.total span');
let count=document.querySelector('.count');
let category=document.querySelector('.category');
let submit=document.querySelector('.create');
let deleteAllC=document.querySelector('.delete-all span')
// search
let search= document.querySelector('.search')
let sTitle= document.querySelector('.search-title')
let sCategory= document.querySelector('.search-category')
// mood for how to want create or update......
let mood='Create';
// متغير وهمي
let tmp;

//put event keyup in html .event do to get value of input . value was changing
function getTotal() {
    if (price.value != '') {
        let t= (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=t
    }
}
// create and add to local storage.................................................................................
let products=[];
if (localStorage.getItem('products')) {
    products=JSON.parse(localStorage.getItem('products'))
}

submit.onclick=function () {
    //for check if value of input not equal to ""
    let inputsNotEmpty=[title,price,category].filter((i)=>i.value!="")
    if (inputsNotEmpty.length==3) {
        let c=+count.value;
        let myObj={
          title:title.value.toLowerCase(),
          price:+price.value,
          taxes:+taxes.value,
          ads:+ads.value,
          discount:+discount.value,
          total:+total.textContent,
          category:category.value.toLowerCase(),
        }  
        // mood=Create
        if (mood=='Create') {
          // count value
          if (c == 0 || c == 1) {
            products.push(myObj)
            pCount++
            deleteAllC.innerHTML=pCount
          }
          else if (c> 1&& c<=20) {
            for (let i = 0; i < c; i++) {
              products.push(myObj)
              pCount++
              deleteAllC.innerHTML=pCount
            }
          }
        } 
        // if mood = Update
        else {
          products[tmp]=myObj
          count.style.display='block';
          submit.value="Create"
          mood="Create"
        }
   
  }
    //to remove value from inputs
    [title,price,category,taxes,ads,discount,count].forEach(i=> i.value="")
    //add to local storage
    localStorage.setItem('products',JSON.stringify(products));
   //طبقت الفكشن هنا لان ميضاف للجدول الا اسوي رفرش فطبقت الفكشن هنا وحطيت المنتجات الي سويتهن حسب الكونت وضفتهن في المصفوفة الاتية
  addToTable(products)
}
//..............................................................................................................
//حتى من اسوي رفرش يضلن في الاحتيامل لان الاعلى للكليك فقط
addToTable(products);
function addToTable(arr) {
  t='';
  for (let i = 0; i < arr.length; i++) {
    t +=
      `<tr class='tr-body'>
        <td>${i+1}</td>
        <td>${arr[i]["title"]}</td>
        <td>${arr[i]["price"]}</td>
        <td>${arr[i]["taxes"]}</td>
        <td>${arr[i]["ads"]}</td>
        <td>${arr[i]["discount"]}</td>
        <td>${arr[i]["total"]}</td>
        <td>${arr[i]["category"]}</td>
        <td><button onclick="updateProduct(${i})" class='update'>Update</button></td>
        <td><button onclick="deleteData(${i})" class='delete'>Delete</button</td>
      </tr>`;
  } 
  document.querySelector('.tbody').innerHTML=t
}
//............................................................................................
//delete all from storage and html
  //to account count products
let pCount= products.length;
deleteAllC.innerHTML=pCount
document.querySelector('.delete-all').onclick=() =>{
  localStorage.clear();
  document.querySelector('.tbody').innerHTML=''
  document.querySelector('.delete-all span').innerHTML=''
  }
//delete product
function deleteData(i) {
  products.splice(i,1)
  localStorage.setItem('products',JSON.stringify(products));
  //to account count products
  pCount--
  deleteAllC.innerHTML=pCount
  addToTable(products);
}
//update product
function updateProduct(i){
  let up=products[i]
  title.value=up.title;
  price.value=up.price;
  taxes.value=up.taxes;
  ads.value=up.ads;
  discount.value=up.discount;
  category.value=up.category;
  //هنا لازم اندي الفكشن يلا تسوي توتل لانها مخصصة للعمل عند الكتابة في الفاليو
  getTotal()
  count.style.display='none';
  // to change submit value
  submit.value='Update'
  // onclick one Update scroll to top 0
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  // change mood to select submit click is (update) to change data fot (product......)
  mood='Update'
  tmp=i
}
//search..........................................................................................
let moodS;
// select clicked for search by title or category
function searchMood(value) {
  // to remove value of search on click another system search (title or category)
  search.value=''
  if (value=='search by title') {
    moodS='title'
    //to return table content on moving to another search system
    addToTable(products)
  } else {
    moodS='category';
    addToTable(products)
  }
  search.placeholder=`search by ${moodS}`
}
function searchP(v) {
  if (moodS=='title') {
    t='';
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(v.toLowerCase())) {
        t +=
        `<tr class='tr-body'>
          <td>${i+1}</td>
          <td>${products[i]["title"]}</td>
          <td>${products[i]["price"]}</td>
          <td>${products[i]["taxes"]}</td>
          <td>${products[i]["ads"]}</td>
          <td>${products[i]["discount"]}</td>
          <td>${products[i]["total"]}</td>
          <td>${products[i]["category"]}</td>
          <td><button onclick="updateProduct(${i})" class='update'>Update</button></td>
          <td><button onclick="deleteData(${i})" class='delete'>Delete</button</td>
        </tr>`; 
      }
  }
  document.querySelector('.tbody').innerHTML=t
  } 
  else if(moodS=='category'){
    t='';
    for (let i = 0; i<products.length; i++) {
      if (products[i].category.includes(v.toLowerCase())) {
        //create new table content
        t +=
      `<tr class='tr-body'>
        <td>${i+1}</td>
        <td>${products[i]["title"]}</td>
        <td>${products[i]["price"]}</td>
        <td>${products[i]["taxes"]}</td>
        <td>${products[i]["ads"]}</td>
        <td>${products[i]["discount"]}</td>
        <td>${products[i]["total"]}</td>
        <td>${products[i]["category"]}</td>
        <td><button onclick="updateProduct(${i})" class='update'>Update</button></td>
        <td><button onclick="deleteData(${i})" class='delete'>Delete</button</td>
      </tr>`; 
      document.querySelector('.tbody').innerHTML=t
      }
    }
  }
  
}
