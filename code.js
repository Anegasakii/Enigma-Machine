let keyPressed = false;
let pressed;
let lamp;
let keyCount = 0;

// substitution settings
const start = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const wheel1 = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const wheel2 = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const wheel3 = "BDFHJLCPRTXVZNYEIWGAKMUSQO";

// starting settings
let left = wheel1;
let middle = wheel2;
let right = wheel3;

let offsetLeft = 0;
let offsetMiddle = 0;
let offsetRight = 0;

function overflowCheck(number, min, max){
    if(number == min-1){
        number = max;
    }
    if(number == max+1){
        number = min;
    }
    return number
}

function offset(wheel,direction){
    switch(wheel){
        case "left":
            offsetLeft += direction;
            offsetLeft = overflowCheck(offsetLeft, 0, 25);
            document.getElementById("left").innerHTML = start[offsetLeft];
            break
        case "middle":
            offsetMiddle += direction;
            offsetMiddle = overflowCheck(offsetMiddle, 0, 25);
            document.getElementById("middle").innerHTML = start[offsetMiddle];
            break
        case "right":
            offsetRight += direction;
            offsetRight = overflowCheck(offsetRight, 0, 25);
            document.getElementById("right").innerHTML = start[offsetRight];
            break
    }
    keyCount = 0;
}

function rotorTick(){
    keyCount++;
    offsetRight = overflowCheck(++offsetRight, 0, 25);
    console.log("Offset:",offsetRight);
    document.getElementById("right").innerHTML = start[offsetRight];
    if(keyCount % 26 == 0){
        offsetMiddle = overflowCheck(++offsetMiddle, 0, 25);
        document.getElementById("middle").innerHTML = start[offsetMiddle];
    }
    if(keyCount % 26**2 == 0){
        offsetLeft = overflowCheck(++offsetLeft, 0, 25);
        document.getElementById("left").innerHTML = start[offsetLeft];
    }
}

function Enigma(e){
    if(keyPressed){
        return
    } else {
        rotorTick();
        console.log("Keystrokes:",keyCount);
        keyPressed = true;
        
        let keynum;

        if(window.event) { // IE                    
            keynum = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera                   
            keynum = e.which;
        }
        
        let letter = String.fromCharCode(keynum);
        console.log("Pressed:", letter);

        pressed = document.getElementById(letter)
        pressed.classList.add("pressed");

        let secret = start.indexOf(letter);


        lamp = document.getElementById(`lamp${letter}`);
        lamp.classList.add("lit");
    }
}

function Clear(){
    keyPressed = false;
    if(pressed == null){
        return
    }
    pressed.classList.remove("pressed");
    lamp.classList.remove("lit");
    return
}