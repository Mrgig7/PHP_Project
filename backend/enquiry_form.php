<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = $_ENV['DB_SERVER']; 
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];

$brevoSMTPHost = $_ENV['BREVO_SMTP_HOST'];
$brevoSMTPPort = $_ENV['BREVO_SMTP_PORT'];
$brevoSMTPUser = $_ENV['BREVO_SMTP_USER'];
$brevoSMTPPassword = $_ENV['BREVO_SMTP_PASSWORD'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $inputData = json_decode(file_get_contents('php://input'), true);

    if (empty($inputData['name']) || empty($inputData['email']) || empty($inputData['message'])) {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
        exit();
    }

    $name = $inputData['name'];
    $email = $inputData['email'];
    $phone = isset($inputData['phone']) ? $inputData['phone'] : '';
    $message = $inputData['message'];

    try {
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            throw new Exception("Connection failed: " . $conn->connect_error);
        }

        $stmt = $conn->prepare("INSERT INTO form_submissions (name, email, phone, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $phone, $message);

        if (!$stmt->execute()) {
            throw new Exception("Error saving form details: " . $stmt->error);
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
        exit();
    }

    $mail = new PHPMailer\PHPMailer\PHPMailer(true); 

    try {
        $mail->isSMTP();
        $mail->Host = $brevoSMTPHost;
        $mail->SMTPAuth = true;
        $mail->Username = $brevoSMTPUser;
        $mail->Password = $brevoSMTPPassword;
        $mail->SMTPSecure = 'tls';
        $mail->Port = $brevoSMTPPort;

        $mail->setFrom($brevoSMTPUser, 'Cocox Team');
        $mail->addAddress($email, $name);
        $mail->isHTML(true);
        $mail->Subject = "Thank You for Your Submission!";
        $mail->Body = "<h3>Dear $name,</h3><p>Thank you for getting in touch! We have received your details and will get back to you shortly.</p><p>Your Message: $message</p><p>Best regards,<br>Cocox</p>";

        $mail->send();

        $mail->clearAddresses();
        $mail->addAddress("jnitesh1463@gmail.com"); 
        $mail->Subject = "New Form Submission Received";
        $mail->Body = "<h3>New Submission Details:</h3><p><strong>Name:</strong> $name</p><p><strong>Email:</strong> $email</p><p><strong>Phone:</strong> $phone</p><p><strong>Message:</strong> $message</p>";
        $mail->send();

        echo json_encode(["status" => "success", "message" => "Form submitted and emails sent successfully."]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Email error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
