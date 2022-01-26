let a;
let b;
let c;
let d;
let array = [];
let globalId;
let globalTitle;
let globalDescription;
let dateSettingId;
let localEle = localStorage.getItem("Note");
console.log(localEle);
let localEle2 = JSON.parse(localEle) || [];
document.getElementById('hidding').style.display = "none";
let x=document.getElementById("recipient-name").value;
let valueDescrip=document.getElementById("message-text").value;
let colorPicker=document.getElementById("recipient-name1").value;
let dateSelector=document.getElementById("recipient-name2").value;

/**
  ************** we are going develop a program in which user write notes:*********************
  ****************Main Function For to Making Notes Structure*******************
  * we have to declared the element in HTML section as a parent div
  * first we will create the the elements through function that will append the child elements in parend div on every click of-
  specified submit button. 
  * In the main function we have also setting and getting data in localStorag
**/

function mainFunction() {
  /**
   * Assigning letiables in function With Block Scope
  */
  var forms = document.getElementById('form')
  //console.log("form",forms);
  if (forms.checkValidity()) {      
    let dataObject = {};
    let random = Math.random() * 100;

    /**
     * creating Elements for creating Notes data as "title, Description, backgroundcolor,and date"
     * "main subDiv"
    */
    
    let mainDiv = document.createElement('div');
    let innerhead = document.createElement('h3');
    let innerDescrip = document.createElement("p");
    let itallic = document.createElement("i");

    //  Creating subDiv For Date and Icons
    let innerDiv = document.createElement('div');
    let forDate = document.createElement("h5");

    //Div for icons in SubDiv
    let innerDiv1 = document.createElement('div');
    let btn = document.createElement('button');
    let btn1 = document.createElement('button');
    let flexImg = document.createElement('img');
    let flexImg1 = document.createElement('img');

    //assigning Id's to Child Elements
    mainDiv.id = "mainId" + random;
    innerhead.id = "title" + random;
    itallic.id = "descrip" + random;
    forDate.id = "dated" + random;
    btn.id = "myBtn";
    dataObject.id = "main" + random;

    globalId = mainDiv.id;
    globalTitle = innerhead.id;
    globalDescription = itallic.id;
    dateSettingId = forDate.id;
    /**
     * Calling Functions of edit and delete  on the click of appended buttons
     * passing Id's to other functions
   */
    btn1.onclick = function () {
      deleteNote("mainId" + random, "main" + random);
    }
    btn.onclick = function () {
      editButton("title" + random, "descrip" + random, "dated" + random, "mainId" + random);
    }
    
    //here assigning the input values to Variables
    let valueTitle = document.getElementById("recipient-name").value;
    let valueDescrip = document.getElementById("message-text").value;
    let colorPicker = document.getElementById("recipient-name1").value;
    let dateSelector = document.getElementById("recipient-name2").value;
    let buttonSubmit = document.getElementById('edited');

    /***
     * Making Object here and its Properties
     * Assigning value to object Properties
    */
    dataObject.Title = valueTitle;
    dataObject.Description = valueDescrip;
    dataObject.color = colorPicker;
    dataObject.Dated = dateSelector;
    console.log(dataObject);

    //Pushing Object in array that present in Global scope
    array.push(dataObject);

    //giving style to the append elements
    mainDiv.style.backgroundColor = colorPicker;
    innerDiv.style.display = "flex";
    innerDiv1.style.marginRight = "5px";
    innerDiv.style.justifyContent = "space-between";
    innerDescrip.style.padding = "5px";
    innerDescrip.style.border = "2px solid black";
    innerDescrip.style.margin = "5px";
    flexImg1.style.width = "20px";
    btn1.style.marginLeft = "5px";
    flexImg.style.width = "20px";

    //assigning inner HTML to append Elements
    flexImg.src = "https://www.kindpng.com/picc/m/148-1488998_edit-pencil-skills-icon-for-resume-png-transparent.png";
    flexImg1.src = 'data:image/png;base64,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';
    itallic.innerHTML = valueDescrip;
    forDate.innerHTML = dateSelector;
    innerhead.innerHTML = valueTitle;

    //appending Elements to the HTML
    mainDiv.appendChild(innerhead);
    mainDiv.appendChild(innerDescrip);
    mainDiv.appendChild(innerDiv);
    innerDiv.appendChild(forDate);
    innerDiv.appendChild(innerDiv1);
    innerDiv1.appendChild(btn);
    innerDiv1.appendChild(btn1);
    btn.appendChild(flexImg);
    btn1.appendChild(flexImg1);
    innerDescrip.appendChild(itallic);
    document.getElementById("main").appendChild(mainDiv);

    //clearing the input values after submit form
    document.getElementById("recipient-name").value = "";
    document.getElementById("message-text").value = "";
    document.getElementById("recipient-name1").value = "";
    document.getElementById("recipient-name2").value = "";

    let existingNotes = [];
    existingNotes = JSON.parse(localStorage.getItem("Note"));
    console.log('existingNotes: ', existingNotes, typeof existingNotes);
    if (existingNotes) {
      existingNotes.push(dataObject);
    } else {
      existingNotes = [dataObject];
    }
    console.log('existingNotes: ', existingNotes);
    localStorage.setItem("Note", JSON.stringify(existingNotes)); 
    
  } else {
    alert('There is still an empty field')
  }
}
/**
 * ********Function for Deleting Notes And Deleting Object From Local Storage*********
 * Making Function for Delete Notes from Container
 * It Persist after refresh
*/

function deleteNote(id, ObjectDelet) {
  //debugger;
  const notes = JSON.parse(localStorage.getItem("Note"));
  let btnlist = document.getElementById(id);
  btnlist.remove();
  const index = notes.findIndex(function (element) {
  if (element.id === ObjectDelet) {
    return true;
    } else {
    return false;
    }
  });
  let splicing = notes.splice(index, 1);
  console.log(splicing);
  array = notes;
  localStorage.setItem("Note", JSON.stringify(notes));
}

/**
 * ****************Function For to Edit Values of Notes*********************
 * Making Function for edit the notes
 * on the calling of this function it will edit the specified Note and returns value to Modal of Bootstrap
 * Recieving Id's in the Parameters of function, Id's for those that's we want to edit data.
*/

function editButton(Id1, Id2, Id3, Id4) {
  document.getElementById('hidding').style.display = "block";
  document.getElementById('edited').style.display = "none";
  let savedTitle = document.getElementById(Id1).innerHTML;
  let inputValue = document.getElementById('recipient-name').value = savedTitle;
  document.getElementById(Id1).innerHTML = inputValue;
  //document.getElementById('add').style.display="none";
  let savedDescrip = document.getElementById(Id2).innerHTML;
  let inputValue1 = document.getElementById('message-text').value = savedDescrip;
  document.getElementById(Id2).innerHTML = inputValue1;

  let dateSetting = document.getElementById(Id3).innerHTML;
  let inputValue2 = document.getElementById('recipient-name2').value = dateSetting;
  document.getElementById(Id3).innerHTML = inputValue2;

  let forColor = document.getElementById(Id4).style.backgroundColor;
  let editedColor = document.getElementById("recipient-name1").value = forColor;
  
  //Assigning Id's to Global letiables for use these id's where we want
  a = Id1;
  b = Id2;
  c = Id3;
  d = Id4;
  
  //it will return the values to Modal of Bootstrap on the click of edit Button and Show Modal Again on DOM
  let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
  })
  myModal.show()
}

/**
 * *******************Function For to Update Values*************************
 * After Edited and changing the value of notes now we have to update it on same notes 
 * we have make a function for update the values of notes
*/
function funcUpdate() {

  let upda = document.getElementById(a).innerHTML;
  let updated = document.getElementById('recipient-name').value;
  document.getElementById(a).innerHTML = updated;
  let upda1 = document.getElementById(b).innerHTML;
  let updated1 = document.getElementById('message-text').value;
  document.getElementById(b).innerHTML = updated1;
  let upda2 = document.getElementById(c).innerHTML;
  let updated2 = document.getElementById('recipient-name2').value;
  document.getElementById(c).innerHTML = updated2;
  let forColor = document.getElementById(d).style.backgroundColor;
  let selectedColor = document.getElementById("recipient-name1").value;
  document.getElementById(d).style.backgroundColor = selectedColor;

  document.getElementById('hidding').style.display = "none";
  document.getElementById('edited').style.display = "block";
  document.getElementById("recipient-name").value="";
  document.getElementById("message-text").value="";
  document.getElementById("recipient-name1").value="";
  document.getElementById("recipient-name2").value="";
}
/**
 * there are Searching Bar on DOM
 * it will search data w.r.t Description and Title
 * if there are matching statement exist in title and description it will show us just those notes
 * for showing same statement notes we have again code it to make structure as in main Function
*/
function myFunction() {
  document.getElementById("main").innerHTML = "";
  let getInput = document.getElementById("searchInput").value.toLowerCase();
  let getData = document.getElementById('main');
  let array2 = array.filter(function (data) {
  if (data.Title.toLowerCase().includes(getInput)) {
      return true;
    } else if (data.Description.toLowerCase().includes(getInput)) {
      return true;
    } else {
      return false;
    }
  });
  for (let i = 0; i < array2.length; i++) {
    let random = Math.random() * 100;
    //creating Elements for creating grid data
    // main subDiv
    let mainDiv = document.createElement('div');
    let innerhead = document.createElement('h3');
    let innerDescrip = document.createElement("p");
    let itallic = document.createElement("i");

    //  Creating subDiv For Date and Icons
    let innerDiv = document.createElement('div');
    let forDate = document.createElement("h5");

    //Div for icons in SubDiv
    let innerDiv1 = document.createElement('div');
    let btn = document.createElement('button');
    let btn1 = document.createElement('button');
    let flexImg = document.createElement('img');
    let flexImg1 = document.createElement('img');

    //assigning Id's
    mainDiv.id = "mainId" + random;
    innerhead.id = "title" + random;
    itallic.id = "descrip" + random;
    forDate.id = "dated" + random;

    globalId = mainDiv.id;
    globalTitle = innerhead.id;
    globalDescription = itallic.id;
    dateSettingId = forDate.id;

    btn1.onclick = function () {
      deleteNote("mainId" + random, "main" + random);
    }

    //here assigning the input values to variable
    let valueTitle = document.getElementById("recipient-name").value;
    let valueDescrip = document.getElementById("message-text").value;
    let colorPicker = document.getElementById("recipient-name1").value;
    let dateSelector = document.getElementById("recipient-name2").value;

    //giving style to the append elements
    mainDiv.style.backgroundColor = array2[i].color;
    innerDiv.style.display = "flex";
    innerDiv1.style.marginRight = "5px";
    innerDiv.style.justifyContent = "space-between";
    innerDescrip.style.padding = "5px";
    innerDescrip.style.border = "2px solid black";
    innerDescrip.style.margin = "5px";
    flexImg1.style.width = "20px";
    btn1.style.marginLeft = "5px";
    flexImg.style.width = "20px";

    //assigning inner HTML to append Elements
    flexImg.src = "https://www.kindpng.com/picc/m/148-1488998_edit-pencil-skills-icon-for-resume-png-transparent.png";
    flexImg1.src = 'data:image/png;base64,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';
    itallic.innerHTML = array2[i].Description;
    forDate.innerHTML = array2[i].Dated;
    innerhead.innerHTML = array2[i].Title;
    //appending Elements to the HTML
    mainDiv.appendChild(innerhead);
    mainDiv.appendChild(innerDescrip);
    mainDiv.appendChild(innerDiv);
    innerDiv.appendChild(forDate);
    innerDiv.appendChild(innerDiv1);
    innerDiv1.appendChild(btn);
    innerDiv1.appendChild(btn1);
    btn.appendChild(flexImg);
    btn1.appendChild(flexImg1);
    innerDescrip.appendChild(itallic);
    document.getElementById("main").appendChild(mainDiv);
  }
}
/** 
 * *********Persist on Refresh**************
 * we have to stored the value in localStorage
 * the we get those value in the start where DOM is ready
 * and after getting value push in an array
 * then we have to apply for-loop on this array that we are getting from localStorage
 * we applied loop to get display the result on DOM
 * it will Persist on Refresh
**/
for (let i = 0; i < localEle2.length; i++) {
  let random = Math.random() * 100;
  //creating Elements for creating grid data
  // main subDiv
  let mainDiv = document.createElement('div');
  let innerhead = document.createElement('h3');
  let innerDescrip = document.createElement("p");
  let itallic = document.createElement("i");

  //  Creating subDiv For Date and Icons
  let innerDiv = document.createElement('div');
  let forDate = document.createElement("h5");

  //Div for icons in SubDiv
  let innerDiv1 = document.createElement('div');
  let btn = document.createElement('button');
  let btn1 = document.createElement('button');
  let flexImg = document.createElement('img');
  let flexImg1 = document.createElement('img');

  //assigning Id's
  mainDiv.id = "mainId" + random;
  innerhead.id = "title" + random;
  itallic.id = "descrip" + random;
  forDate.id = "dated" + random;

  globalId = mainDiv.id;
  globalTitle = innerhead.id;
  globalDescription = itallic.id;
  dateSettingId = forDate.id;

  btn1.onclick = function () {
    deleteNote("mainId" + random, "main" + random);
  }

  btn.onclick = function () {
    editButton("title" + random, "descrip" + random, "dated" + random, "mainId" + random);
  }

  //here assigning the input values to letiable
  let valueTitle = document.getElementById("recipient-name").value;
  let valueDescrip = document.getElementById("message-text").value;
  let colorPicker = document.getElementById("recipient-name1").value;
  let dateSelector = document.getElementById("recipient-name2").value;

  //giving style to the append elements
  mainDiv.style.backgroundColor = localEle2[i].color;
  innerDiv.style.display = "flex";
  innerDiv1.style.marginRight = "5px";
  innerDiv.style.justifyContent = "space-between";
  innerDescrip.style.padding = "5px";
  innerDescrip.style.border = "2px solid black";
  innerDescrip.style.margin = "5px";
  flexImg1.style.width = "20px";
  btn1.style.marginLeft = "5px";
  flexImg.style.width = "20px";

  //assigning inner HTML to append Elements
  flexImg.src = "https://www.kindpng.com/picc/m/148-1488998_edit-pencil-skills-icon-for-resume-png-transparent.png";
  flexImg1.src = 'data:image/png;base64,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';
  itallic.innerHTML = localEle2[i].Description;
  forDate.innerHTML = localEle2[i].Dated;
  innerhead.innerHTML = localEle2[i].Title;
  //appending Elements to the HTML
  mainDiv.appendChild(innerhead);
  mainDiv.appendChild(innerDescrip);
  mainDiv.appendChild(innerDiv);
  innerDiv.appendChild(forDate);
  innerDiv.appendChild(innerDiv1);
  innerDiv1.appendChild(btn);
  innerDiv1.appendChild(btn1);
  btn.appendChild(flexImg);
  btn1.appendChild(flexImg1);
  innerDescrip.appendChild(itallic);
  document.getElementById("main").appendChild(mainDiv);
}