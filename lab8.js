let c = document.querySelector("#c1");
c.style.backgroundColor = "silver";
let ctx = c.getContext("2d");

const CSS_COLOR_NAMES = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];

// create objects per the lab activity
let gameObjs = [];
// gameObjs.push( {x: 250, y: 250, radius: 25, color: "red" } )
// gameObjs.push( {x: 275, y: 275, radius: 25, color: "green" } )
// gameObjs.push( {x: 200, y: 300, radius: 25, color: "blue" } )

function drawRandomCircles(){
    for (let j = 0; j < 25; j++) { 
        const randomX = Math.floor(Math.random() * 300) + 100; 
        const randomY = Math.floor(Math.random() * 300) + 100; 
        const randomColor = Math.floor(Math.random() * CSS_COLOR_NAMES.length); 
        gameObjs.push( {x: randomX, y: randomY, radius: 25, color: CSS_COLOR_NAMES[randomColor] } )

    }
}

drawRandomCircles()


function drawInitialCircle(obj){
    ctx.beginPath()
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI*2); 
    ctx.closePath();
    ctx.fillStyle = obj.color;
    ctx.fill();
}

gameObjs.forEach( (obj) => {
    drawInitialCircle(obj)
});

// create a function named areColliding that accepts two objects and returns a boolean based on collision
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

function areColliding(circle1, circle2){

    var dx = circle1.x - circle2.x;
    var dy = circle1.y - circle2.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.radius + circle2.radius) {
        // collision detected!
        return true
    }else{
        return false
    }
}

function redrawWithBorder(obj, borderColor){
    ctx.beginPath()
    ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI*2);
    ctx.lineWidth=4;
    ctx.strokeStyle = borderColor;
    ctx.stroke();    
    ctx.closePath();
    ctx.fillStyle = obj.color;
    ctx.fill();    
}


function comparePairs(gameObjs){
    for (let i = 0; i < gameObjs.length; i++) {
        for (let j = 0; j < gameObjs.length; j++) {
            if(i != j){
                const areCollidingResult = areColliding(gameObjs[i], gameObjs[j])
                if(areCollidingResult){
                    redrawWithBorder(gameObjs[i], 'white')
                }                
            }
        }
    }
}

comparePairs(gameObjs)



// once you get that working, update the code above to create 25 additional gameObjects with random x, y and color values; and push them to the array before the drawing and comparison
