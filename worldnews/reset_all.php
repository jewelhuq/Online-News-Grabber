<?php
include "config.php";
$u=$_GET['u'];
$p=$_GET['p'];
if($admin_name==="$u" and $admin_pass==="$p"){
$files = glob('cache/*'); // get all file names
foreach($files as $file){ // iterate files
  if(is_file($file))
    unlink($file); // delete file
    }
    echo  "<h1 align='center'>Successfully Deleted. Now please open your site & click everylink one by one & wait untile completion of the page loading <br><a href='./index.php'>Home</a></h1>";
}



?>