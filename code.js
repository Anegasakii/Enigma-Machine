let keyPressed = false;
let pressed;
let lamp;

let start = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let reflect = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

let wheel1 = {
    sub: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    notch: 24
};

let wheel2 = {
    sub: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    notch: 12
};

let wheel3 = {
    sub: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    notch: 3
};

let left = {
    name: 'left',
    wheel: wheel1,
    offset: 0
};

let middle = {
    name: 'middle',
    wheel: wheel2,
    offset: 0
}

let right = {
    name: 'right',
    wheel: wheel3,
    offset: 0
}

function overCheck(check, min, max){
    let output = check;
    if(check > max){
        output = min + (check - max - 1);
    }
    if(check < min){
        output = max + (check - min + 1);
    }
    if(output > max || output < min){
        output = overCheck(output, min, max);
    }
    return output;
}

function offset(pos,direction){
    pos.offset += direction;
    pos.offset = overCheck(pos.offset, 0, 25);
    document.getElementById(pos.name).innerHTML = start[pos.offset];
}

function rotorTick(){
    if(right.offset == right.wheel.notch){
        if(middle.offset == middle.wheel.notch){
            offset(left, 1);
        }
        offset(middle, 1);
    }
    offset(right, 1);
}

function convert(input, bridge, forwards){
    let output;
    if(forwards){
        let index = start.indexOf(input);
        if(bridge == reflect){
            output = reflect[index];
            return output;
        }
        index = overCheck(index += bridge.offset, 0, 25);
        output = bridge.wheel.sub[index];
        return output;
    } else {
        let index = bridge.wheel.sub.indexOf(input);
        index = overCheck(index -= bridge.offset, 0, 25);
        output = start[index];
        return output;
    }
}

function fullConvert(input){
    let output = convert(convert(convert(convert(convert(convert(convert(input,right,true),middle,true),left,true),reflect,true),left,false),middle,false),right,false);
    return output;
}

function Enigma(e){
    if(keyPressed){
        return
    } else {
        
        let keynum;

        if(window.event) { // IE                    
            keynum = e.keyCode;
        } else if(e.which){ // Netscape/Firefox/Opera                   
            keynum = e.which;
        }
        
        const letter = String.fromCharCode(keynum);
        if(start.indexOf(letter) == -1){
            return
        }

        console.log("Pressed:", letter);
        keyPressed = true;

        pressed = document.getElementById(letter)
        pressed.classList.add("pressed");

        let secret = fullConvert(letter);
        console.log(secret);
        
        rotorTick();
        lamp = document.getElementById(`lamp${secret}`);
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

function keysDisplay() {
    let keyboard = document.getElementsByClassName("keyboard")[0];
    if(keyboard.classList.contains("hidden")){
            keyboard.classList.remove("hidden");
    } else {
        keyboard.classList.add("hidden");
    }
}