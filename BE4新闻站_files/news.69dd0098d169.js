document.addEventListener("DOMContentLoaded", function() {

    // Highlight the posted comment, if comment-id is in url hash
    if(e = document.getElementById(window.location.hash.substring(1))) e.classList.add('highlight');

    function getFormData(form) {
        var data = {};
        for (var i = 0, ii = form.length; i < ii; ++i) {
            var input = form[i];
            if (input.name) {
                data[input.name] = input.value;
            }
        }
        return data;
    }
    // AJAX-ify the upvote button
    document.querySelectorAll(".vote-form").forEach(function (elem_form) {
        elem_form.addEventListener("submit", function(e){
            e.preventDefault();
            var form = e.srcElement;
            var data = getFormData(form);
            var xhr = new XMLHttpRequest();
            xhr.open(form.method, form.action, true);
            var form_data = new FormData();
            for ( var key in data ) {
                form_data.append(key, data[key]);
            }
            xhr.send(form_data);
            // form.parentNode.removeChild(form);
            var parent = form.parentNode;
            var grandparent = parent.parentNode;
            var tmpObj=document.createElement("span");
            tmpObj.innerHTML="&nbsp;";
            grandparent.replaceChild(tmpObj,parent);
        });
    });

});

function setLabel(label){
  var form_input = document.getElementById("id_tags");
  form_input.value = form_input.value + ", " + label;
  return true;
}

function setRandomDelay(id){
  var form_input = document.getElementById(id);
  form_input.value = Math.floor((Math.random() * 480) + 20);
  return true;
}

function setZeroDelay(id){
  var form_input = document.getElementById(id);
  form_input.value = "0";
  return true;
}

document.body.onload = function startTime() {
  var today = new Date();
  document.getElementById('utc_clock').innerHTML = "UTC: "+today.toISOString().substring(0,16);
  var t = setTimeout(startTime, 500);
}
