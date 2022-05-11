<?php
header("Access-Control-Allow-Origin: *");
$dns = 'mysql:host=localhost;dbname=storage_system';
$user = 'root';
$pwd = '';

try {
    $db = new PDO($dns, $user, $pwd);
} catch (PDOException $e) {
    echo 'Connection failed';
    die();
}

// Get all products from management
if ($_POST['action'] == 'getProducts') {
    $array = [];
    $x = 0;

    $sql = 'SELECT * FROM management_products';
    $stmt = $db->prepare($sql);
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        while($row = $stmt->fetch()) {
            $array[$x]['id'] = $row['id_product'];
            $array[$x]['mark'] = $row['mark'];
            $array[$x]['name'] = $row['name_product'];
            $array[$x]['description'] = $row['description'];
            $array[$x]['quantity'] = $row['quantity'];
            $array[$x]['date'] = $row['date'];
            $array[$x]['serial_number'] = $row['serial_number'];
            $x++;
        }
    echo json_encode($array);
    }
}

?>
