function randomAdditionBox(){
    var randNum,
    totalNum = 0,
    boxWidth,
    boxHeight,
    selectedValue;
    
    // Insert zero as the starting total.
    $("total span").text(totalNum);

    // Populate each box with a random number between 1 and 20.
    this.generateNumbers = function(){
        $("numbox span").each(function(){
            randNum = Math.floor((Math.random() * 20 ) + 1);        
            $(this).text(randNum);
        });        
    }

    // We are assigning the public version of the generateNumbers function to a new
    // copy since the "this" keyword in the context of a jQuery method means
    // something totally different.
    generateNumbers = this.generateNumbers;

    // This is jQuery UI's dragging feature.
    $("adder").draggable({
        snap: "numbox",
        snapMode: "inner",
        snapTolerance: 50,
        containment: $("adder").parent().parent(),
        revert: true,
        revertDuration : 200
    });

    // This is where we add what's in the target box to our current total
    // before resetting the boxes with new random numbers.
    calculateAndReset = function(){
        totalNum = Number(totalNum) + Number(selectedValue);
        $("total span").text(totalNum);            
        generateNumbers();        
    }

    // Here is where we execute the functionality that happens upon the user
    // dragging the adder into the number box. 
    $("numbox").droppable({
        drop: function(){
            var boxWidth = $(this).width(),
            boxHeight = $(this).height();
            $(this)
            .animate({
                width: (boxWidth * 1.1) +"px",
                height: (boxHeight * 1.1) + "px"
            }, 200)
            .animate({
                width: boxWidth + "px",
                height: boxHeight + "px"
            }, 200);
            selectedValue = $(this).text();
            calculateAndReset();
        }
    });  
    
    // Set the total back to zero and supply a fresh batch of random numbers
    // for the number boxes. 
    $(".reset").click(function(){
        generateNumbers();
        $("total span").text("0");
        selectedValue = 0;
        totalNum = 0;
    });  
}