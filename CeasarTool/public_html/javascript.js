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
  //alert("in load file");
  var cypherfile = document.getElementById("cypherToLoad").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) 
  {
    var textFromFile = fileLoadedEvent.target.result;
    document.getElementById("cypherText").value = textFromFile;
  };
  fileReader.readAsText(cypherfile, "UTF-8");
}


function decrypt(){
  //THIS IS ALL MESSED UP WITH CYPHER V. PLAIN, GO OVER IT CAREFULL
  
  
  var lowAlpha = "abcdefghijklmnopqrstuvwxyz";
  var upAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var key = document.getElementById("key").value;
  var plainText = "";
  var cypherText = document.getElementById("cypherText").value.toUpperCase();
  var index, random, nextChar;
  var plainChar, cypherChar;
  var location;
  
  //plaintext = plaintext.toUpperCase;
  
  for(index=0;index<cypherText.length; index++){
    cypherChar = cypherText.charAt(index);
    location = upAlpha.indexOf(cypherChar); 
    if (location === -1){
      plainText += cypherChar; // copy all non-aphabet char straight over
      } else {
        plainChar = key.charAt(location); // copy all alphabet chars via key
        plainText += plainChar;
      }
    }
  document.getElementById("plainText").value = plainText; 
}



function UseFrequencies(){
  //alert("use freq");
  var lowAlpha = "abcdefghijklmnopqrstuvwxyz";
  var upAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var newKey = "--------------------------";
  var freqOrder   = ['e','t','a','o','i','n','s','h','r','d','l','c','u',
                     'm','w','f','g','y','p','b','v','k','j','x','q','z'];
  var freqCount   = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];   
  var freqCountSort  = [];
  var cypherText = document.getElementById("cypherText").value.toUpperCase();
  var index = 0;
  var location = 0;
  var cypherChar = "";
  
  for(index=0;index<cypherText.length; index++){
    cypherChar = cypherText.charAt(index);
    location = upAlpha.indexOf(cypherChar);
    if (location >= 0) freqCount[location]++;
    }
    
  freqCountSort = freqCount;
  freqCountSort.sort( function(a,b) {return a-b;} );
  freqCountSort.reverse(); //freqCountSort is not the frequencies in order
  //we want the matching lowAlpha for the freqCount 
  
  for(index=0;index<26; index++){
    var nextChar = freqOrder[index];  // next char by freqency
    var count = freqCountSort[index]; // next count
    var where = freqCount.indexOf(count);
    //alert("here");
    newKey = newKey.substr(0, where) + nextChar + newKey.substr(where + 1);
    }
  
  
  
  var displayString = "";
  for(index=0;index<26; index++){
    displayString += freqCountSort[index] + " ";
    }
  document.getElementById("plainText").value = newKey;
  document.getElementById("key").value = newKey;
  
  
  
  
  
  
    
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
  var k = "";
   
  k = document.getElementById("Amap").value; key += k;
  k = document.getElementById("Bmap").value; key += k;
  k = document.getElementById("Cmap").value; key += k;
  k = document.getElementById("Dmap").value; key += k;
  k = document.getElementById("Emap").value; key += k;
  k = document.getElementById("Fmap").value; key += k;
  k = document.getElementById("Gmap").value; key += k;
  k = document.getElementById("Hmap").value; key += k;
  k = document.getElementById("Imap").value; key += k;
  k = document.getElementById("Jmap").value; key += k;
  k = document.getElementById("Kmap").value; key += k;
  k = document.getElementById("Lmap").value; key += k;
  k = document.getElementById("Mmap").value; key += k;
  k = document.getElementById("Nmap").value; key += k;
  k = document.getElementById("Omap").value; key += k;
  k = document.getElementById("Pmap").value; key += k;
  k = document.getElementById("Qmap").value; key += k;
  k = document.getElementById("Rmap").value; key += k;
  k = document.getElementById("Smap").value; key += k;
  k = document.getElementById("Tmap").value; key += k;
  k = document.getElementById("Umap").value; key += k;
  k = document.getElementById("Vmap").value; key += k;
  k = document.getElementById("Wmap").value; key += k;
  k = document.getElementById("Xmap").value; key += k;
  k = document.getElementById("Ymap").value; key += k;
  k = document.getElementById("Zmap").value; key += k;
  
  
  document.getElementById("key").value = key;
}