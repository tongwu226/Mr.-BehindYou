// http://127.0.0.1:8887/

var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

let x = 250;
let y = 250;
let nx = 250;
let ny = 250;
let s = 10;
var result;

let canvasWidth = 450;
let canvasHeight = 450;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);

  textAlign(LEFT, TOP);
  textSize(14);

	p1 =createDiv(" ") ;
	p2 =createDiv(" ") ;
	p3 =createDiv(" ") ;
	d = createDiv(" ");

  myRec.onResult = showResult;
  myRec.start();

  // 	// mic = new p5.AudioIn();
  // 	// mic.start();
}
function draw(){
setTimeout(timetoLeave, 15000);
setTimeout(letGo,26000)
}

function showResult() {
  // recognition system will often append words into phrases.
  // so hack here is to only use the last word:
  //if (myRec.resultValue == true) {
  //text(myRec.resultString, width / 2, height / 2);
  var mostrecentword = myRec.resultString.split(' ').pop();
  if (mostrecentword.indexOf("talk") !== -1 || mostrecentword.indexOf("me") !== -1  ) {
    console.log(myRec.resultString);

		stroke(0, 255 - (s * 10));
    strokeWeight(10 / s);
    curve(x + random(s * 3) - s + 50, y + random(s * 3) - s + 50, x, y, nx, ny, nx + random(s * 3) - s, ny + random(s * 3) - s);
    x = nx;
    y = ny;
    nx = nx + random(s * 4) - s * 2;
    ny = ny + random(s * 4) - s * 2;
    if (dist(x, y, nx, ny) > s / .6) {
      s++;
    } else {
      s--;
    }
    if (s < 1) {
      s = 1;
    }
    if (s > 10) {
      s = 10;
    }
  } else if (mostrecentword.indexOf("leave") !== -1) {
		setTimeout(pleaseLeave, 1500);
 } else if (mostrecentword.indexOf("go") !== -1){
    setTimeout(tellstory,3000);
  } else {
		return;
	}
}
// function CalcPic () {
// 	loadPixels();
// 	var off;
// 	var sumIndex;
// 	for (var y = 0; y < canvasHeight; y++) {
// 		for (var x = 0; x < canvasWidth; x++) {
// 			off = (y * width + x) * 4;
// 			sumIndex += (0.2126 * pixels[off + 0] + 0.7152 * pixels[off + 1] + 0.0722 * pixels[off + 2]) / (255 * 45);
// 		}
// 	};
// 	result = floor(map(sumIndex, 0,1, 0, 150));
// 	updatePixels();
//   console.log(result);
// }
function timetoLeave(){
  p1.html("Now it's time to ask the spirit to leave. Say 'please leave'.")
}
function pleaseLeave(){
	p2.html("I finally found you. I won't leave. ");
}
function letGo(){
	p3.html("Say 'Please GO!'to force the spirit to leave!")
}

function tellstory() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
	var output1 = grammar.flatten("#origin1#");
	var output2 = grammar.flatten("#origin2#");
	var output3 = grammar.flatten("#origin3#");
	var output4 = grammar.flatten("#origin4#");
	var output5 = grammar.flatten("#origin5#");
	var output6 = grammar.flatten("#origin6#");
  d.html("Do you know what I just write?"+"<br />" + "<br />"+output1 + "<br />" + "<br />"  +output2 + "<br />" +output3 + "<br />" + output4 + "<br />" + "I will never let you go." + "<br />" +"<br />"+ output5 +"<br />" + output6);
}

var grammarSource = {
  // "origin": [
  //   "My #names#, my #sals#: \n \n \
	// 	You are my #adjs# #nouns#. \n \
	// 	My #nouns# #verbs# for your #adjs# #nouns#, my #nouns# #advs# #verbs# your #nouns#.\n \
	// 	My #adjs# #nouns#.\n \n \
	// 	Yours #advs#,\n \
	// 	Mr.FollowYou "
  // ],
	"origin1": ["My #names#, my #sals#:"],
	"origin2": ["You are my #adjs# #nouns#. "],
	"origin3": ["My #nouns# #verbs# for your #adjs# #nouns#, my #nouns# #advs# #verbs# your #nouns#."],
	"origin4":["My #adjs# #nouns#."],
	"origin5":["Yours #advs#,"],
	"origin6":["Mr. BehindYou"],

  "sals": ["Beloved", "Darling", "Dear", "Dearest", "Fanciful", "Honey"],

  "names": ["Princess", "Dear", "Baby", "Jewel", "Love", "Moppet", "Sweetheart"],

  "adjs": ["affectionate", "amorous", "anxious", "avid", "beautiful", "breathless", "burning", "covetous", "craving", "curious", "eager", "fervent", "fondest", "loveable", "lovesick", "loving", "passionate", "precious", "seductive", "sweet", "sympathetic", "tender", "unsatisfied", "winning", "wistful"],

  "nouns": ["adoration", "affection", "ambition", "appetite", "ardour", "being", "burning", "charm", "craving", "desire", "devotion", "eagerness", "enchantment", "enthusiasm", "fancy", "fellow feeling", "fervour", "fondness", "heart", "hunger", "infatuation", "little liking", "longing", "love", "lust", "passion", "rapture", "sympathy", "thirst", "wish", "yearning"],

  "advs": ["affectionately", "ardently", "anxiously", "beautifully", "burningly", "covetously", "curiously", "eagerly", "fervently", "fondly", "impatiently", "keenly", "lovingly", "passionately", "seductively", "tenderly", "wistfully"],

  "verbs": ["adores", "attracts", "clings to", "holds dear", "hopes for", "hungers for", "likes", "longs for", "loves", "lusts after", "pants for", "pines for", "sighs for", "tempts", "thirsts for", "treasures", "yearns for", "woos"],

}
