<?php
header('content-type: application/json');
session_start();
$inreq = $_GET["req"];
$pack = array();

if($inreq=="setsession"){
  $email = $_GET["emailj"];
  $_SESSION["email"] = $email;
  $response = array('code'=>'30', 'message'=>'Welcome Back');
  echo json_encode($response);
}else if($inreq=="getsession"){
  $response = array('code'=>'50', 'email'=>$_SESSION["email"]);
  echo json_encode($response);
}

 ?>
