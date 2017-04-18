/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var freqOrder   = {'e','t','a','o','i','n','s','h','r','d','l','c','u',
//                   'm','w','f','g','y','p','b','v','k','j','x','q','z'};
//var freqPercent = {12.702,9.056,8.167,7.507,6.966,6.749,6.327,6.094,5.987,4.253,4.025,2.782,2.758,
//                  2.406,2.360,2.228,2.015,1.974,1.929,1.492,0.978,0.772,0.153,0.150,0.095,0.074};
                 
function loadFile(){
  var cypherfile = document.getElementById("cypherToLoad").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) 
  {
    var textFromFile = fileLoadedEvent.target.result;
    document.getElementById("cypherText").value = textFromFile;
  };
  fileReader.readAsText(cypherfile, "UTF-8");
}


function encrypt(){
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var key = document.getElementById("keyinput").value;
  var plainText = document.getElementById("plaintext").value.toUpperCase();
  var cypherText = "";
  var index, random, nextChar;
  var plainChar, cypherChar;
  var location;
  
  //plaintext = plaintext.toUpperCase;
  
  for(index=0;index<plainText.length   ; index++){
    //this picks a random char from aphabet, adds it to key, and deletes it from alphabet
    plainChar = plainText.charAt(index);
    location = alphabet.indexOf(plainChar);  // this will be -1 if not in alphabet string
    if (location === -1){
      cypherText += plainChar; // copy all non-aphabet char straight to cyphertext
      } else {
        cypherChar = key.charAt(location); // copy all alphabet chars via key
        cypherText += cypherChar;
      }
    }
  document.getElementById("cypherText").value = cypherText; 
}






function saveAs()
{
    var textToSave = document.getElementById("cypherText").value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("saveAs").value;
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
 
    downloadLink.click();
}

 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}                 


function setKey(){
  var lowAlpha = "abcdefghijklmnopqrstuvwxyz";
  var upAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var key = "";
  
  key += upAlpha.charAt( lowAlpha.indexOf(document.getElementById("Amap").value) );
  key += upAlpha.charAt( lowAlpha.indexOf(document.getElementById("Bmap").value) );
  key += upAlpha.charAt( lowAlpha.indexOf(document.getElementById("Cmap").value) );
  key += upAlpha.charAt( lowAlpha.indexOf(document.getElementById("Dmap").value) );
  
  
  document.getElementById("key").value = key;
}