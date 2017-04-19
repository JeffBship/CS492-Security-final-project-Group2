4/19/17 Notes:
Frequency analysis is working but needs a couple tweeks.
Turns out that different authors have different letter frequencies.  Specifially, Lewis Carrol does NOT have the standard frequency in Alice in Wonderland.  (I was going nuts until I figured this out.)
Set the order of letter frequency in javascript.js line 91 if you want to go back to the default. Or just use the file Alice_Chapter_1.txt for any testing.  I'm including it in the git repo.

To do frequency analysis:  CHOOSE FILE -->  LOAD FILE -->  USE FREQUENCIES --> DECRYPT

We might want to move the buttons around to a more logical order.

My thoughs for Spellchecking:
put code in the javascript2.js file to minimize merge conflicts.
Spellchecker should show the number of misspellings that currently exist in the plant text window.
Maybe change the "Plain Text" label to say "Plain Text,  there are XXX misspelled words".

Once that's up and running, "Try All Offsets" can cycle through each offset and choose the one with the least misspellings.

Brute Force would do the same thing, except it only works if you have some minimum number of choices selected in the key setting column on the right.  Maybe some sort of calculation can show estimating how long it would take.

