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