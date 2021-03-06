/* 
 * Adrian Ward-Manthey and Jeff Blankenship
 * CS492 Final Project.
 * Prof Williams
 */


function loadFile(){
  var plainfile = document.getElementById("fileToLoad").files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent) 
  {
    var textFromFile = fileLoadedEvent.target.result;
    document.getElementById("plaintext").value = textFromFile;
  };
  fileReader.readAsText(plainfile, "UTF-8");
}

function randomize(){
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randomKey = "";
  var index, random, nextChar;
  
  for(index=0;index<26; index++){
    //this picks a random char from aphabet, adds it to key, and deletes it from alphabet
    random = Math.floor(  Math.random()*(alphabet.length));
    nextChar = alphabet.charAt(random);
    randomKey += nextChar;
    alphabet = alphabet.replace(nextChar,'');
    }
  document.getElementById("keyinput").value = randomKey; 
}

function offset(){
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var thisFreq = "";
  var offsetKey = "";
  var offset = parseInt(document.getElementById("offset").value);
  var index, keyIndex, nextChar;
  
  //It doesn't like negative numbers for offset
  while (offset<0) offset += 26;
  
  for(index=0;index<26; index++){
    //this picks a random char from aphabet, adds it to key, and deletes it from alphabet
    keyIndex = ( index + offset) % 26;
    offsetKey += alphabet.charAt(keyIndex);
    }
  document.getElementById("keyinput").value = offsetKey; 
}


function encrypt(){
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowAlpha = "abcdefghijklmnopqrstuvwxyz";
  var thisFreq = "";
  var key = document.getElementById("keyinput").value;
  var plainText = document.getElementById("plaintext").value.toUpperCase();
  var cypherText = "";
  var index, random, nextChar;
  var plainChar, cypherChar;
  var location;
  var freqCount   = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];  
  var freqString = ""
  
  //plaintext = plaintext.toUpperCase;
  
  for(index=0;index<plainText.length   ; index++){
    //this picks a random char from aphabet, adds it to key, and deletes it from alphabet
    plainChar = plainText.charAt(index);
    location = alphabet.indexOf(plainChar);  // this will be -1 if not in alphabet string
    if (location === -1){
      cypherText += plainChar; // copy all non-aphabet char straight to cyphertext
      } else {
        freqCount[location]++;  //and give the frequency count
        cypherChar = key.charAt(location); // copy all alphabet chars via key
        cypherText += cypherChar;
      }
    }
  document.getElementById("cypherText").value = cypherText; 
  
  var freqCountSort = freqCount.slice();
  freqCountSort.sort( function(a,b) {return a-b;} );
  freqCountSort.reverse(); //freqCountSort is now the Counts in order
  
  for(index=0;index<26; index++){
    var count = freqCountSort[index];
    var where = freqCount.indexOf(count);
    thisFreq += lowAlpha[where];
    }
  document.getElementById("frequency").value = thisFreq;  
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