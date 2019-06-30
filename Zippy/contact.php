<!DOCTYPE html>
<html>

<head>

    <title>Contact Page</title>

</head>

<body>

    <?php
        $_POST["myname"] = substr($_POST["myname"], 0, 50);
        $unsafe = array(";", "'", "\"", "&", "\\");
        $_POST["myname"] = str_replace($unsafe, "", $_POST["myname"]);
        $_POST["myname"] = strip_tags($_POST["myname"]);
        echo $_POST["myname"];
        echo "<br>";

        $_POST["email"] = substr($_POST["email"], 0, 50);
        $unsafe = array(";", "'", "\"", "&", "\\");
        $_POST["email"] = str_replace($unsafe, "", $_POST["email"]);
        $_POST["email"] = strip_tags($_POST["email"]);
        echo $_POST["email"];
        echo "<br>";

        $_POST["message"] = substr($_POST["message"], 0, 50);
        $unsafe = array(";", "'", "\"", "&", "\\");
        $_POST["message"] = str_replace($unsafe, "", $_POST["message"]);
        $_POST["message"] = strip_tags($_POST["message"]);
        echo $_POST["message"];
        echo "<br>";

        $_POST["phone"] = substr($_POST["phone"], 0, 50);
        $unsafe = array(";", "'", "\"", "&", "\\");
        $_POST["phone"] = str_replace($unsafe, "", $_POST["phone"]);
        $_POST["phone"] = strip_tags($_POST["phone"]);
        echo $_POST["phone"];
        echo "<br>";

        $message_to_send = "The name field is: " . $_POST["myname"] . "\r\nThe email field is: " . $_POST["email"] . "\r\nThe message field is: " . $_POST["message"];
        $headers = 'MIME-Version: 1.0' . '\r\n';
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . '\r\n';
        $headers .= 'From: Richard Aviles <richard@richardtest.x10host.com>' . '\r\n';
        $mailme = mail('Reply-To: r_aviles1985@yahoo.com', 'Contact Entry Information', $message_to_send, $headers);
        echo $mailme;
        echo "<br>";
    ?>

</body>

</html>