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
  var newKey = "";
  newKey += document.getElementById("Amap").value;
  newKey += document.getElementById("Bmap").value;
  newKey += document.getElementById("Cmap").value;
  newKey += document.getElementById("Dmap").value;
  newKey += document.getElementById("Emap").value;
  newKey += document.getElementById("Fmap").value;
  newKey += document.getElementById("Gmap").value;
  newKey += document.getElementById("Hmap").value;
  newKey += document.getElementById("Imap").value;
  newKey += document.getElementById("Jmap").value;
  newKey += document.getElementById("Kmap").value;
  newKey += document.getElementById("Lmap").value;
  newKey += document.getElementById("Mmap").value;
  newKey += document.getElementById("Nmap").value;
  newKey += document.getElementById("Omap").value;
  newKey += document.getElementById("Pmap").value;
  newKey += document.getElementById("Qmap").value;
  newKey += document.getElementById("Rmap").value;
  newKey += document.getElementById("Smap").value;
  newKey += document.getElementById("Tmap").value;
  newKey += document.getElementById("Umap").value;
  newKey += document.getElementById("Vmap").value;
  newKey += document.getElementById("Wmap").value;
  newKey += document.getElementById("Xmap").value;
  newKey += document.getElementById("Ymap").value;
  newKey += document.getElementById("Zmap").value;
  document.getElementById("key").value = newKey;
  
  
  
  
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
  var keyArray = ['','','','','','','','','','','','','','','','','','','','','','','','','',''];
  //var freqOrder = "etaoinshrdlcumwfgypbvkjxqz";   //Robert Lewand's Cryptological Mathematics
  var freqOrder = "etoahinsrldwugfcymbpkvxqjz";      //Lewis Carrol, Alice in Wonderland
  var thisFreq = ""
  var freqOrderarray = "";
  var freqCount   = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];   
  var freqCountSort  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];   
  var cypherText = document.getElementById("cypherText").value.toUpperCase();
  var index = 0;
  var location = 0;
  var cypherChar = "";
  var text = "SHOWING STATS FOR TESTING:   \n";
  
  for(index=0;index<cypherText.length; index++){
    cypherChar = cypherText.charAt(index);
    location = upAlpha.indexOf(cypherChar);
    if (location >= 0) freqCount[location]++;
    }
  //sometimes there are equal counts and it messes things up
  //we might should add some sort of handler method for that
  //like maybe if there are equals just make them both zero and map to '*' or something.
  //Should only be an issue for small files. 
  var repeat = 0;
  for (var i=0;i<25;i++){
    for(var j=i+1;j<25;j++){
      if (freqCount[i]==freqCount[j]){
        repeat++;
        text += upAlpha.charAt(i) + "," + upAlpha.charAt(j) + " ";
      }
    }
  }
  if (repeat > 0){
    text += "are repeated in the CypherText.  You'll need to adjust those.\n";
  }
    
      
  
    
  freqCountSort = freqCount.slice();
  freqCountSort.sort( function(a,b) {return a-b;} );
  freqCountSort.reverse(); //freqCountSort is now the Counts in order
  //
  
    
  
  
  for(index=0;index<26; index++){
    var count = freqCountSort[index];
    var where = freqCount.indexOf(count);
    keyArray[where] = freqOrder.charAt(index);
    thisFreq += lowAlpha[where];
    /*
    text += index + "\n " + index + "\n " + 
            "\n count: " + count +
            "\n  where" + where +
            "\n freqOrder.charAt(index): " + freqOrder.charAt(index) + 
            "\n\n";
    */
    }
  text += "thisFreq: " + thisFreq + "\n";  
  var newKey = keyArray.join('');  
    
  text +=     "freqCount is    " + freqCount + "\n" 
            + "freqCountSort is: " + freqCountSort + "\n" 
            + "freqOrderarray is: " + freqOrderarray + "\n" 
            + "newKey is: " + newKey;
  
  document.getElementById("plainText").value = text;
  document.getElementById("key").value = newKey;
  
  document.getElementById("Amap").value = keyArray[0];
  document.getElementById("Bmap").value = keyArray[1];
  document.getElementById("Cmap").value = keyArray[2];
  document.getElementById("Dmap").value = keyArray[3];
  document.getElementById("Emap").value = keyArray[4];
  document.getElementById("Fmap").value = keyArray[5];
  document.getElementById("Gmap").value = keyArray[6];
  document.getElementById("Hmap").value = keyArray[7];
  document.getElementById("Imap").value = keyArray[8];
  document.getElementById("Jmap").value = keyArray[9];
  document.getElementById("Kmap").value = keyArray[10];
  document.getElementById("Lmap").value = keyArray[11];
  document.getElementById("Mmap").value = keyArray[12];
  document.getElementById("Nmap").value = keyArray[13];
  document.getElementById("Omap").value = keyArray[14];
  document.getElementById("Pmap").value = keyArray[15];
  document.getElementById("Qmap").value = keyArray[16];
  document.getElementById("Rmap").value = keyArray[17];
  document.getElementById("Smap").value = keyArray[18];
  document.getElementById("Tmap").value = keyArray[19];
  document.getElementById("Umap").value = keyArray[20];
  document.getElementById("Vmap").value = keyArray[21];
  document.getElementById("Wmap").value = keyArray[22];
  document.getElementById("Xmap").value = keyArray[23];
  document.getElementById("Ymap").value = keyArray[24];
  document.getElementById("Zmap").value = keyArray[25];
  
  
  
  
  
  
  
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

function reset(){
  document.getElementById("Amap").value = "A";
  document.getElementById("Amap").value = "B";
  document.getElementById("Amap").value = "C";
  document.getElementById("Amap").value = "D";
  document.getElementById("Amap").value = "E";
  document.getElementById("Amap").value = "F";
  document.getElementById("Amap").value = "G";
  document.getElementById("Amap").value = "H";
  document.getElementById("Amap").value = "I";
  document.getElementById("Amap").value = "J";
  document.getElementById("Amap").value = "K";
  document.getElementById("Amap").value = "L";
  document.getElementById("Amap").value = "M";
  document.getElementById("Amap").value = "N";
  document.getElementById("Amap").value = "O";
  document.getElementById("Amap").value = "P";
  document.getElementById("Amap").value = "Q";
  document.getElementById("Amap").value = "R";
  document.getElementById("Amap").value = "S";
  document.getElementById("Amap").value = "T";
  document.getElementById("Amap").value = "U";
  document.getElementById("Amap").value = "V";
  document.getElementById("Amap").value = "W";
  document.getElementById("Amap").value = "X";
  document.getElementById("Amap").value = "Y";
  document.getElementById("Amap").value = "Z";
  
  
  
  
}
