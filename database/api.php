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

// Login
if($_POST['action'] == 'login') {
    $sql = 'SELECT * FROM users WHERE userName = :userName AND userPwd = :userPwd';
    $stmt = $db->prepare($sql);

    $stmt->bindParam(':userName', $_POST['userName']);
    $stmt->bindParam(':userPwd', $_POST['userPwd']);
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        echo json_encode(['login' => true]);
    } else {
        echo json_encode(['login' => false]);
    }
}

// Get all products from management
if ($_POST['action'] == 'getProducts') {
    $array = [];
    $x = 0;

    //$sql = 'SELECT * FROM products WHERE id_department = :id_department ORDER BY mark ASC';
    $sql = 'SELECT *, (ideal_quantity-quantity) AS resta FROM products WHERE id_department = :id_department ORDER BY mark ASC';
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id_department', $_POST['id_department']);
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        while($row = $stmt->fetch()) {
            $array[$x]['id'] = $row['id_product'];
            $array[$x]['mark'] = $row['mark'];
            $array[$x]['name'] = $row['name_product'];
            $array[$x]['description'] = $row['description'];
            $array[$x]['quantity'] = $row['quantity'];
            $array[$x]['ideal_quantity'] = $row['ideal_quantity'];
            $array[$x]['resta'] = $row['resta'];
            $array[$x]['date'] = $row['date'];
            $array[$x]['serial_number'] = $row['serial_number'];
            $x++;
        }
    echo json_encode($array);
    }
}

// Add an existing product to management storage
if ($_POST['action'] == 'addProduct') {
    $array = [];
    $x = 0;

    $sql = "SELECT * FROM products WHERE id_department = :id_department AND ( name_product LIKE CONCAT('%', :name_product '%') 
            OR mark LIKE CONCAT('%', :mark '%') OR serial_number LIKE CONCAT('%', :serial_number '%') OR description LIKE CONCAT('%', :description '%') ) ORDER BY id_product ASC";

    $stmt = $db->prepare($sql);

    $stmt->bindParam(':id_department', $_POST['id_department']);
    $stmt->bindParam(':name_product', $_POST['name_product']);
    $stmt->bindParam(':mark', $_POST['mark']);
    $stmt->bindParam(':serial_number', $_POST['serial_number']);
    $stmt->bindParam(':description', $_POST['description']);
    
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
            $array[$x]['amount'] = $row['amount'];
            $x++;
        }
        echo json_encode($array);
    } else {
        echo json_encode(['status' => false]);
    }
}

// Add quantity product to management storage
if ($_POST['action'] == 'saveProduct') {
    $sql = "UPDATE products SET quantity = quantity + 1 WHERE id_product = :id_product;
            UPDATE products SET date = :date WHERE id_product = :id_product;";

    $stmt = $db->prepare($sql);

    $stmt->bindParam(':date', $_POST['date']);
    $stmt->bindParam(':id_product', $_POST['id_product']);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => true]);
    } else {
        echo json_encode(['status' => false]);
    }
}

// Delete quantity product to management storage
if ($_POST['action'] == 'deleteProduct') {
    $sql = "UPDATE products SET quantity = quantity - 1 WHERE id_product = :id_product;
            UPDATE products SET date = :date WHERE id_product = :id_product;";

    $stmt = $db->prepare($sql);

    $stmt->bindParam(':date', $_POST['date']);
    $stmt->bindParam(':id_product', $_POST['id_product']);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => true]);
    } else {
        echo json_encode(['status' => false]);
    }
}

// New product
if ($_POST['action'] == 'newProduct') {
    $sql = "INSERT INTO products (mark, name_product, description, quantity, serial_number, ideal_quantity, date, id_department) 
            VALUES (:mark, :name_product, :description, :quantity, :serial_number, :ideal_quantity, :date, :id_department);";

    $stmt = $db->prepare($sql);

    $stmt->bindParam(':mark', $_POST['mark']);
    $stmt->bindParam(':name_product', $_POST['name_product']);
    $stmt->bindParam(':description', $_POST['description']);
    $stmt->bindParam(':quantity', $_POST['quantity']);
    $stmt->bindParam(':serial_number', $_POST['serial_number']);
    $stmt->bindParam(':ideal_quantity', $_POST['ideal_quantity']);
    $stmt->bindParam(':date', $_POST['date']);
    $stmt->bindParam(':id_department', $_POST['id_department']);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(['status' => true]);
    } else {
        echo json_encode(['status' => false]);
    }
}

// Add an existing product to management storage mobile
if ($_POST['action'] == 'addProductMobile') {
    $array = [];
    $x = 0;

    $sql = "SELECT * FROM products WHERE serial_number LIKE CONCAT('%', :serial_number '%') OR name_product LIKE CONCAT('%', :name_product '%')";

    $stmt = $db->prepare($sql);

    $stmt->bindParam(':serial_number', $_POST['serial_number']);
    $stmt->bindParam(':name_product', $_POST['name_product']);
    
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        while($row = $stmt->fetch()) {
            $array[$x]['serial_number'] = $row['serial_number'];
            $array[$x]['mark'] = $row['mark'];
            $array[$x]['name'] = $row['name_product'];
            $array[$x]['description'] = $row['description'];
            $array[$x]['quantity'] = $row['quantity'];
            $array[$x]['date'] = $row['date'];
            $x++;
        }
        echo json_encode($array);
    } else {
        echo json_encode(['status' => false]);
    }
}
    
?>
