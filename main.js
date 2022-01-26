let title=document.querySelector('.title');
let price=document.querySelector('.price');
let taxes=document.querySelector('.taxes');
let ads=document.querySelector('.ads');
let discount=document.querySelector('.discount');
let total=document.querySelector('.total span');
let create=document.querySelector('.create');
let table=document.querySelector('table');
let inp=document.querySelectorAll('.inp');
let obj={};
create.onclick=function () {
    inp.forEach(function (i) {
    //   if (i.type==="number") {
    //        +i.value
           
    //   }
      console.log( i.value) 
    })
    // if (title.value!='') {
    //     console.log(typeof title.value)
    //    obj.title=title.value 
    // } 
    // console.log(obj)
}

//put event keyup in html .event do to get value of input . value was changing
function getTotal(v) {
    if (price.value != '') {
        let t= (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=t
    }
}
//console.log(title.type)

