// jQuery Code coz' of checkbox.. !!
$("input:checkbox").on('click', function() {
    var $box = $(this);
    if ($box.is(":checked")) {
      var group = "input:checkbox[name='" + $box.attr("name") + "']";
      $(group).prop("checked", false);
      $box.prop("checked", true);
    } else {
      $box.prop("checked", false);
    }
  });

  // Jquery to handle checkbox values. Hopefully it works..
  $(document).ready(function () {
	/* Get the checkboxes values based on the class attached to each check box */
	$("#submit").click(function() {
	    getValueUsingClass();
	});
});

function getValueUsingClass(){
	/* declare an checkbox array */
	var chkArray = [];
	/* look for all checkboes that have a class 'answer' attached to it and check if it was checked */
	$(".answer:checked").each(function() {
		chkArray.push($(this).val());
	});
	
	/* we join the array separated by the comma */
	var selected;
	selected = chkArray.join(',') ;
	
	/* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
	if(selected.length > 1){
        console.log(selected);
        // alert("You have selected " + selected);	
	}else{
		alert("Please check a box");	
	}
}


  // Handles the feri-feri for the start application
document.getElementById("start").addEventListener("click", destroy);
    function destroy(){
        document.getElementById("test").style.display = "none";
        document.getElementById("start").style.display = "none";
    }
    document.getElementById("start").addEventListener("click", show);
    function show() {
        document.getElementById("show").style.display = "block";
    }
