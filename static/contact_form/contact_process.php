<?php
$to = "alessio.corsini@gmail.com";
$name = $_POST['name'];
$company = $_POST['company'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$from = $_POST['email'];
$headers = "From:" . $from;
ini_set("SMTP","smtp.theme-oxygen.com"); 
ini_set("sendmail_from","postmaster@theme-oxygen.com");
mail($to,$name,$message,$headers);
echo "Mail Sent.";
?>
