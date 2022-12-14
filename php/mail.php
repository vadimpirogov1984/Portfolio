<?php

$recepient = "vadim_pirogov@mail.ru";
$sitename = "Сайт-портфолио";

$name = trim($_POST["contacts-page__name"]);
$tel = trim($_POST["contacts-page__phone"]);
$email = trim($_POST["contacts-page__mail"]);
$text = trim($_POST["contacts-page__text"]);
$message = "Имя: $name \nТелефон: $tel \nПочта: $email \nТекст: $text";

$pagetitle = "Сообщение с сайта портфолио \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>

