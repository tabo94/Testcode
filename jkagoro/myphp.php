<?php
header('content-type: application/json');
require "connect.php";
$reqp = strip_tags(@$_GET['req']);
if($reqp == "signup"){
  $fnamep = strip_tags(@$_GET['fnamej']);
  $lnamep = strip_tags(@$_GET['lnamej']);
  $unamep = strip_tags(@$_GET['unamej']);
  $emailp = strip_tags(@$_GET['emailj']);
  $pswp = strip_tags(@$_GET['pswj']);
  //seeing if any user has same email address
  $sqlquery = "SELECT * FROM user WHERE emailaddress='$emailp'";
  $sqlresult = mysqli_query($accounts, $sqlquery) or die(mysqli_error($accounts));
  //counting rows of result
  $countresult = mysqli_num_rows($sqlresult);
  if($countresult>0){
    $present = array('code'=>'36', 'message'=>'Sorry, the email address you entered is already in use. Try another');
  }else{
    $sqlinsert = "INSERT INTO user(firstname, lastname, username, emailaddress, password) VALUES('$fnamep', '$lnamep', '$unamep', '$emailp', '$pswp')";
    if(mysqli_query($accounts, $sqlinsert)){
      $present = array('code'=>'38', 'message'=>'Your account has been created');
    }else{
      $present = array('code'=>'39', 'message'=>'An error occurred. Please try again');
    }
  }
  echo json_encode($present);
}else if($reqp == "login"){
  $emailp = strip_tags(@$_GET['emailj']);
  $pswp = strip_tags(@$_GET['pswj']);
  $sqlquery = "SELECT * FROM user WHERE emailaddress='$emailp' AND password='$pswp'";
  $sqlresult = mysqli_query($accounts, $sqlquery) or die(mysqli_error($accounts));
  $countresult = mysqli_num_rows($sqlresult);
  if($countresult>0){
    $present1 = array('code'=>'40', 'message'=>'Welcome');
  }else{
    $present1 = array('code'=>'41', 'message'=>'Login failed. Wrong credentials used');
  }
  echo json_encode($present1);

}

 ?>
