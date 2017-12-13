$(document).ready(function(){

  $.getJSON('sess.php', {req:'getsession'}, function(datax){
    if(datax.email==""){

    }else{
      $("#loginbtn").hide();
      $("#signupbtn").hide();
    }
  });

  var modal = document.getElementById('loginbox');
  var modal1 = document.getElementById('signupbox');
  //show login box when loginbtn is clicked
  $("#loginbtn").on('click',function(){
    modal.style.display = "block";
  })
  //show signup box when signup btn is clicked
  $("#signupbtn").on('click',function(){
    modal1.style.display = "block";
  })
  //close box when close is clicked
  $("span").on('click', function(){
    modal.style.display = "none";
    modal1.style.display = "none";
  })
//when user clicks anywhere out of the loginbox
  window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }else if(event.target == modal1){
    modal1.style.display = "none";
  }
}
//signup validation
$("#signupform").on('submit', function(){
  var fname = $("#s1").val();
  var lname = $("#s2").val();
  var uname = $("#s3").val();
  var email = $("#s4").val();
  var psw = $("#s5").val();
  var pswx = $("#s6").val();

if(uname.length < 5){
  alert("Username too short. Try something longer than 5");
}else if(psw.length < 7){
  alert("Password is too short. Try something longer than 7");
}else if (psw!=pswx ){
  alert("Passwords do not match");
}else{
  $.getJSON('myphp.php', {req:'signup', fnamej:fname,lnamej:lname,unamej:uname,emailj:email,pswj:psw}, function(data){
    console.log(data);
    alert(data.message);
  });
  console.log(fname+"--"+lname+"--"+uname+"--"+email+"--"+psw+"--"+pswx);
}
return false;
});

//login authentication
$("#loginform").on('submit', function(){
  var email = $("#l1").val();
  var psw = $("#l2").val();
//query database for user
  $.getJSON('myphp.php', {req:'login', emailj:email, pswj:psw}, function(data){
    if(data.code == '41'){
      alert(data.message);
    }else{
      $.getJSON('sess.php', {req:'setsession', emailj:email}, function(datax){
        alert(datax.message);
        $("#loginbtn").hide();
        $("#signupbtn").hide();
      });
    }
  });
    return false;
});
//leaving a comment_button
$("#textit").on('submit', function(){
  var comment = $("#c1").val();
  console.log(comment);
  $.getJSON('sess.php', {req:'getsession'}, function(datax){
    alert(datax.email);
  });
  return false;
});
//scheduling appointment button
$("#scheduleform").on('submit', function(){
  $.getJSON('sess.php', {req:'getsession'}, function(datax){
    if(datax.email==""){
      console.log("Please Sign In/Log in first");
      return false;
    }else{
      var date = $("#fordate").val();
      var seldate = $('input[name=timeslot]:checked').val();
      console.log(date);
      console.log(seldate);
      console.log("Here");
      return false;
    }
  });

});
});
