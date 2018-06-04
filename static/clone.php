<?php


error_reporting(E_ALL);
ini_set("display_errors", "On");


        $data = json_decode(file_get_contents('php://input'), true);


        $name=$data[0]['fData']['inputName']; 
        $name=$data[0]['fData']['inputSurname'];
        $email=$data[0]['fData']['inputEmail'];
        $country=$data[0]['fData']['country'];
        $city=$data[0]['fData']['city'];
        $address=$data[0]['fData']['address'];
        
        $message=$data[0]['fData']['inputMessage']; 
        $to = "alessio.corsini@gmail.com";
        $toClient = $email;
        
        $message = '<html><body>';
        $message .= "<div style='margin-bottom: 10px;font-size:20px;'><strong>EvoBook</strong></div>";
        $message .= "<div style='margin-bottom: 10px;'><strong>Name: </strong>" . strip_tags($data[0]['fData']['inputName']) . "</div>";
        $message .= "<div style='margin-bottom: 10px;'><strong>Surname: </strong>" . strip_tags($data[0]['fData']['inputSurname']) . "</div>";
        $message .= "<div style='margin-bottom: 10px;'><strong>Country: </strong>" . strip_tags($data[0]['fData']['country']) . "</div>";
        $message .= "<div style='margin-bottom: 10px;'><strong>City: </strong>" . strip_tags($data[0]['fData']['city']) . "</div>";
        $message .= "<div style='margin-bottom: 10px;'><td><strong>Address: </strong>" . strip_tags($data[0]['fData']['address']) . "</div>";
        $message .= "<div style='background: #eee;'><strong>Message: </strong>" . strip_tags($data[0]['fData']['inputMessage']) . "</div><br/>";
        
        $message .= '<table rules="all" style="border-color: #666;" cellpadding="10">
        <tr><td><strong>Title</strong> </td><td><strong>Price</strong> </td><td><strong>Quantity</strong> </td></tr>';


        $addURLS = $_POST['addURLS'];
        for($i = 0; $i < sizeof($data[0]['items']); $i++){
  
              $message .= "<tr>
                            <td>" . strip_tags($data[0]['items'][$i][title]) . "</td>
                            <td>" . strip_tags($data[0]['items'][$i][price]) . "</td>
                            <td>" . strip_tags($data[0]['items'][$i][quantity]) . "</td>
                          </tr>";
  
        }

        $message .= "</table><br/><br/>";
        
        $message .= "<div style='background: #eee;'><td><strong>Total Product: </strong>" . strip_tags($data[0]['totalCount']) . "</div><br/>";
        $message .= "<div style='background: #eee;'><td><strong>Total Price: </strong>" . strip_tags($data[0]['totalPrice']) . "</div><br/><br/>";
        
        $message .= "</body></html>";
        
        
        $headers = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        
        $from = $to;
        $headers .= "From:" . $from;
        mail($to,$name,$message,$headers);
        mail($toClient,$name,$message,$headers);
        

        echo "Email sent!"; 
       
    ?>