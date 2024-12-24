<?php
//include 'config.php';
$id=$_POST["id"];
$var1=$_POST["var1"];

$res->id=$id;
$res->var1=$var1;
echo json_encode($res);
