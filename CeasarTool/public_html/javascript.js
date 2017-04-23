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

function getKey(){
  var key = "";
  key += document.getElementById("Amap").value;
  key += document.getElementById("Bmap").value;
  key += document.getElementById("Cmap").value;
  key += document.getElementById("Dmap").value;
  key += document.getElementById("Emap").value;
  key += document.getElementById("Fmap").value;
  key += document.getElementById("Gmap").value;
  key += document.getElementById("Hmap").value;
  key += document.getElementById("Imap").value;
  key += document.getElementById("Jmap").value;
  key += document.getElementById("Kmap").value;
  key += document.getElementById("Lmap").value;
  key += document.getElementById("Mmap").value;
  key += document.getElementById("Nmap").value;
  key += document.getElementById("Omap").value;
  key += document.getElementById("Pmap").value;
  key += document.getElementById("Qmap").value;
  key += document.getElementById("Rmap").value;
  key += document.getElementById("Smap").value;
  key += document.getElementById("Tmap").value;
  key += document.getElementById("Umap").value;
  key += document.getElementById("Vmap").value;
  key += document.getElementById("Wmap").value;
  key += document.getElementById("Xmap").value;
  key += document.getElementById("Ymap").value;
  key += document.getElementById("Zmap").value;
  return key;
}

function setKey(setArray){
  document.getElementById("Amap").value = setArray[0];
  document.getElementById("Bmap").value = setArray[1];
  document.getElementById("Cmap").value = setArray[2];
  document.getElementById("Dmap").value = setArray[3];
  document.getElementById("Emap").value = setArray[4];
  document.getElementById("Fmap").value = setArray[5];
  document.getElementById("Gmap").value = setArray[6];
  document.getElementById("Hmap").value = setArray[7];
  document.getElementById("Imap").value = setArray[8];
  document.getElementById("Jmap").value = setArray[9];
  document.getElementById("Kmap").value = setArray[10];
  document.getElementById("Lmap").value = setArray[11];
  document.getElementById("Mmap").value = setArray[12];
  document.getElementById("Nmap").value = setArray[13];
  document.getElementById("Omap").value = setArray[14];
  document.getElementById("Pmap").value = setArray[15];
  document.getElementById("Qmap").value = setArray[16];
  document.getElementById("Rmap").value = setArray[17];
  document.getElementById("Smap").value = setArray[18];
  document.getElementById("Tmap").value = setArray[19];
  document.getElementById("Umap").value = setArray[20];
  document.getElementById("Vmap").value = setArray[21];
  document.getElementById("Wmap").value = setArray[22];
  document.getElementById("Xmap").value = setArray[23];
  document.getElementById("Ymap").value = setArray[24];
  document.getElementById("Zmap").value = setArray[25];
}


function decrypt(){
  //alert("in decrypt()");
  var key = getKey();
  
  //THIS IS ALL MESSED UP WITH CYPHER V. PLAIN, GO OVER IT CAREFULL
  var lowAlpha = "abcdefghijklmnopqrstuvwxyz";
  var upAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var plainText = "";
  var cypherText = document.getElementById("cypherText").value.toUpperCase();
  var index, random, nextChar;
  var plainChar, cypherChar, location;
  
  for(index=0;index<cypherText.length; index++){
    cypherChar = cypherText.charAt(index);
    location = upAlpha.indexOf(cypherChar);  // .indexOf is -1 for a non-upAlpha character
    if (location === -1){
      plainText += cypherChar; // copy all non-upAlpha char straight over
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
  var keyArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  //var freqOrder = "etaoinshrdlcumwfgypbvkjxqz";   //Robert Lewand's Cryptological Mathematics
  //var freqOrder = "etoahinsrldwugfcymbpkvxqjz";      //Lewis Carrol, Alice in Wonderland
  var freqOrder = document.getElementById("frequencyOrder").value;
  var thisFreq = "";
  var freqOrderarray = "";
  var freqCount   = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];   
  var freqCountSort  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];   
  var cypherText = document.getElementById("cypherText").value.toUpperCase();
  var index = 0;
  var location = 0;
  var cypherChar = "";
  var text = "SHOWING STATS FOR TESTING:   \n";
  
  // Count how many times each character occurs.
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
    text += "had same frequency.  You'll need to adjust those.\n";
  }
  //Make a list of character counts sorted to line up against the standard order.  
  freqCountSort = freqCount.slice();
  freqCountSort.sort( function(a,b) {return a-b;} );
  freqCountSort.reverse(); //freqCountSort is now the Counts in order
  
  //find the letter matching each count (in order) and make the key point at it.
  for(index=0;index<26; index++){
    var count = freqCountSort[index];
    var where = freqCount.indexOf(count);
    keyArray[where] = freqOrder.charAt(index);
    thisFreq += lowAlpha[where];  //for display during testing.
    /*
    text += index + "\n " + index + "\n " + 
            "\n count: " + count +
            "\n  where" + where +
            "\n freqOrder.charAt(index): " + freqOrder.charAt(index) + 
            "\n\n";
    */
    }
    
  //for display during testing.  
  text  += "thisFreq: " + thisFreq + "\n"
          +"freqCount is    " + freqCount + "\n" 
          + "freqCountSort is: " + freqCountSort + "\n" 
          + "freqOrderarray is: " + freqOrderarray + "\n" 
          + "new Key is: " + keyArray ;
  
  document.getElementById("plainText").value = text;
  
  setKey(keyArray);
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





//Modify to check word against a dictionary 
var dicString;
var dicArray;
var junk;

function getdic(){
  var cypherfile = document.getElementById("DicFile").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) 
  {
    dicString = fileLoadedEvent.target.result;
    //document.getElementById("dictionary").value = dicString;
    localStorage.setItem("words", dicString);
  };
  fileReader.readAsText(cypherfile, "UTF-8");
}



// http://www.roseindia.net/java/javascript-array/javascript-array-binary-search.shtml
// No author name given
function binarySearch(arr, key){
  var result = 0;
  var strMid;
  var strKey;
  var left = 0;
  var right = arr.length - 1;
  var mid;
  while ((left <= right) && (result === 0) ) {
    mid = parseInt((left + right)/2);
    //alert("mid is " + mid);
    
    strMid = arr[mid].trim().toUpperCase();
    strKey = key.trim().toUpperCase();
    
    //alert(" strMid" + strMid +"    strKey" + strKey );
    
    if (String(strMid).valueOf() === String(strKey).valueOf()) {
      //alert("I found it");
      result = 1;
      
      } else if (String(strMid).valueOf() < String(strKey).valueOf()) {
        // Apparently javascript thinks "a" < "z"
        //alert('arr[mid].toUpperCase() > key.toUpperCase()');
        left = mid + 1;
        } else {
        //alert('else {');
        right = mid - 1;
        }
    }
    //alert("result is " + result);
    return result;
}


function spellCheck(){
  getdic();
  //alert("hey asshole, hold on a few seconds, this is a really big dic");
// Retrieve
  var result = localStorage.getItem("words");
  //alert(result);
  var dictArray = result.split("\r");
  //document.getElementById("plainText").value= dictArray;
  //alert(dictArray[300]);
  
  var wordCount = 0;
  var word = "";
  var text = document.getElementById("plainText").value;
  alert(text);
  var re = /\r/gi;
  var s1 = text.replace(re,"~");
  var s2 = s1.replace( / /gi,"~");
  
  var index;
  var textArr = s2.split('~');
  var textLength = textArr.length;
  for(index = 0; index<textLength; index++){
     //alert("searching for" + textArr[index]);
    if (textArr[index].length>0){
      if (binarySearch(dictArray, textArr[index]) === 0) {
        //do nothing
        wordCount++;
        } 
      }
    }
    alert("wordCount  " +  wordCount); 
    localStorage.setItem("wordCount", wordCount);
    return wordCount;
       
   }

//will just print out key along with number of mispellings for now...
function bruteForce(){
  var keyArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  alert("I am here");
  var mispelled=0;
  for(cock = 0; cock < 26; cock++){
    decrypt();
    //mispelled = spellCheck();
    //mispelled = localStorage.getItem("wordCount");
    alert(mispelled);
    var keyArray2 = [];
    var x;
    var temp = keyArray[0];
    for (x=0;x<25;x++){
      //alert("I am there  "  +  x);
      keyArray2[x] = keyArray[x+1];
      }
    keyArray2[25]=temp;
    keyArray = keyArray2;
    setKey(keyArray);
    alert("cock = " + cock);
    
   
    
    
    }  
}

/*
 * Turned out we don't need this as a separate button, incorporated into decrypt()
 * but not deleted (yet)
 
function setKey(){
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
*/

function reset(){
  //alert("in reset");
  document.getElementById("Amap").value = 'A';
  document.getElementById("Bmap").value = 'B';
  document.getElementById("Cmap").value = 'C';
  document.getElementById("Dmap").value = 'D';
  document.getElementById("Emap").value = 'E';
  document.getElementById("Fmap").value = 'F';
  document.getElementById("Gmap").value = 'G';
  document.getElementById("Hmap").value = 'H';
  document.getElementById("Imap").value = 'I';
  document.getElementById("Jmap").value = 'J';
  document.getElementById("Kmap").value = 'K';
  document.getElementById("Lmap").value = 'L';
  document.getElementById("Mmap").value = 'M';
  document.getElementById("Nmap").value = 'N';
  document.getElementById("Omap").value = 'O';
  document.getElementById("Pmap").value = 'P';
  document.getElementById("Qmap").value = 'Q';
  document.getElementById("Rmap").value = 'R';
  document.getElementById("Smap").value = 'S';
  document.getElementById("Tmap").value = 'T';
  document.getElementById("Umap").value = 'U';
  document.getElementById("Vmap").value = 'V';
  document.getElementById("Wmap").value = 'W';
  document.getElementById("Xmap").value = 'X';
  document.getElementById("Ymap").value = 'Y';
  document.getElementById("Zmap").value = 'Z';
  
  //alert("end of reset");
  
  
}
