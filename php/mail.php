<?php

$recepient = "vadim_pirogov@mail.ru";
$sitename = "Сайт-портфолио";

$name = trim($_POST["name"]);
$tel = trim($_POST["tel"]);
$email = trim($_POST["email"]);
$text = trim($_POST["text"]);
$message = "Имя: $name \nТелефон: $tel \nПочта: $email \nТекст: $text";

$pagetitle = "Сообщение с сайта портфолио \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>

