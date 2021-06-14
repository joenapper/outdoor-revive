<?php
    $name = $_POST['name'];
    $visitor_tel = $_POST['telephone'];

    $email_from = 'info@outdoor-revive.co.uk';
    $email_subject = 'New Outdoor Revive Form Submission';
    $email_body = "Name: $name.\n".
                    "Contact Number: $visitor_tel.\n";

    $to = 'joenapper.se@gmail.com';

    $headers = "From: $email_from \r\n";
    
    mail($to, $email_subject, $email_body, $headers);

    header("Location: index.html");
?>