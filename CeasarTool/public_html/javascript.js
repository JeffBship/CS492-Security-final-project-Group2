/* 
 * Adrian Ward-Manthey and Jeff Blankenship
 * CS492 Final Project.
 * Prof Williams
 */
        
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
  var key = getKey();
  var upAlpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var plainText = "";
  var cypherText = document.getElementById("cypherText").value.toUpperCase();
  var plainChar, cypherChar, location;
  for(var index=0;index<cypherText.length; index++){
    cypherChar = cypherText.charAt(index);
    location = upAlpha.indexOf(cypherChar);  
    if (location === -1){       // .indexOf is -1 for a non-upAlpha character
      plainText += cypherChar;  // copy all non-upAlpha char straight over
      } else {
        plainChar = key.charAt(location); // copy all alphabet chars via key
        plainText += plainChar;
      }
    }
  document.getElementById("plainText").value = plainText; 
}



function UseFrequencies(){
  
  
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
    thisFreq += lowAlpha[where]; 
    }
  text  += "new Key is: " + keyArray + "\n Click decrypt to try it.";
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
    strMid = arr[mid].trim().toUpperCase();
    strKey = key.trim().toUpperCase();
    if (String(strMid).valueOf() === String(strKey).valueOf()) {
      //alert("I found it");
      result = 1;
      } else if (String(strMid).valueOf() < String(strKey).valueOf()) {
        left = mid + 1;
        } else {
        right = mid - 1;
        }
    }
    return result;
}


function spellCheck(){
  getdic();
  var result = localStorage.getItem("words");
  var dictArray = result.split("\r");
  var wordCount = 0; var word = "";
  var text = document.getElementById("plainText").value;
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
        wordCount++;
        } 
      }
    }
    document.getElementById("count").value = wordCount;
    var test = document.getElementById("count").value;
   }

function bruteForce(){
  var keyArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'], mis = [] , keyOff = [];
  var key='';
  setKey(keyArray);
  var mispelled=0;
  for(c = 0; c < 26; c++){
    decrypt();
    spellCheck();
    mispelled = parseInt( document.getElementById("count").value ) ;
    mis.push(mispelled);
    var keyArray2 = [];
    var x;
    var temp = keyArray[25];
    for (x=0;x<25;x++){
      keyArray2[x+1] = keyArray[x];
      }
    keyArray2[0]=temp;
    keyArray = keyArray2;
    for(index = 0; index<26;index++){
        key+=keyArray[index];
    }
    keyOff.push(key);
    key='';
    setKey(keyArray);
    }  
    //FIND ABSOLUTE MINIMUM
    var minIndex=0;
    var min = mis[0];
    var index;
    for(index=0; index<26; index++){
        if(mis[index]< min){
            minIndex=index;
            min=mis[index];
        }
    }
    var keyOriginal = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var minKey = [];
    for(var k=0;k<26;k++){
      minKey[k] = keyOriginal[ (k-minIndex+26)%26 ];
    }
    setKey(minKey);
    document.getElementById("count").value = mis[minIndex];
    decrypt();
}

function reset(){
  var UpAlphaArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  setKey(UpAlphaArray);
}
