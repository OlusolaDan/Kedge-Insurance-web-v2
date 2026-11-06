<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): never {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) respond(413, ['success' => false, 'message' => 'The request is too large.']);
$data = json_decode($raw, true);
if (!is_array($data)) respond(400, ['success' => false, 'message' => 'Invalid request.']);

$type = $data['type'] ?? '';
$required = match ($type) {
    'contact' => ['fullName', 'email', 'phone', 'message'],
    'quote' => ['fullName', 'email', 'phone', 'category', 'description'],
    'renewal' => ['policyHolder', 'insuranceClass', 'email', 'phone'],
    default => respond(400, ['success' => false, 'message' => 'Unknown enquiry type.']),
};
$errors = [];
foreach ($required as $field) {
    if (!isset($data[$field]) || !is_string($data[$field]) || trim($data[$field]) === '') $errors[$field] = 'This field is required.';
}
if (isset($data['email']) && (!is_string($data['email']) || !filter_var(trim($data['email']), FILTER_VALIDATE_EMAIL))) $errors['email'] = 'Enter a valid email address.';
if (isset($data['phone']) && (!is_string($data['phone']) || strlen(preg_replace('/\D+/', '', $data['phone'])) < 8)) $errors['phone'] = 'Enter a valid telephone number.';
if ($type === 'quote' && isset($data['category']) && !in_array($data['category'], ['Motor', 'Marine & Aviation', 'Property & Engineering', 'Liability', 'Life & Personal', 'Commercial & Specialist', 'Other / Not sure'], true)) $errors['category'] = 'Select a valid insurance category.';
foreach (['fullName' => 160, 'organization' => 200, 'email' => 254, 'phone' => 40, 'category' => 80, 'specificProduct' => 160, 'clientType' => 20, 'assetDetails' => 1000, 'estimatedSumInsured' => 100, 'startDate' => 30, 'description' => 5000, 'message' => 5000] as $field => $maxLength) {
    if (isset($data[$field]) && (!is_string($data[$field]) || strlen($data[$field]) > $maxLength)) $errors[$field] = 'This field is too long or invalid.';
}
if (empty($data['privacyConsent'])) $errors['privacyConsent'] = 'Consent to the privacy notice is required.';
if (isset($data['description']) && (!is_string($data['description']) || strlen(trim($data['description'])) < 10)) $errors['description'] = 'Please provide at least 10 characters.';
if (isset($data['message']) && (!is_string($data['message']) || strlen(trim($data['message'])) < 10)) $errors['message'] = 'Please provide at least 10 characters.';
if ($errors) respond(422, ['success' => false, 'message' => 'Please correct the highlighted fields.', 'errors' => $errors]);

$recipient = getenv('KEDGE_ENQUIRY_EMAIL') ?: ($_SERVER['KEDGE_ENQUIRY_EMAIL'] ?? 'info@kedgeinsure.com.ng');
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    $recipient = 'info@kedgeinsure.com.ng';
}

$labels = ['contact' => 'General enquiry', 'quote' => 'Quotation request', 'renewal' => 'Renewal review'];
$prefix = ['contact' => 'ENQ', 'quote' => 'QUO', 'renewal' => 'RNW'][$type];
$reference = sprintf('KDG-%s-%s-%04d', $prefix, date('Y'), random_int(1000, 9999));
$lines = ['Reference: ' . $reference, 'Enquiry type: ' . $labels[$type]];
foreach ($data as $key => $value) {
    if ($key === 'privacyConsent' || $key === 'type' || !is_scalar($value)) continue;
    $label = ucfirst(preg_replace('/([a-z])([A-Z])/', '$1 $2', (string)$key));
    $lines[] = $label . ': ' . trim((string)$value);
}
$fromEmail = 'info@kedgeinsure.com.ng';
$sender = trim((string)($data['email'] ?? ''));
$headers = [
    'From: KEDGE Website <' . $fromEmail . '>',
    'Reply-To: ' . (filter_var($sender, FILTER_VALIDATE_EMAIL) ? $sender : $fromEmail),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];
$subject = 'Website ' . $labels[$type] . ' - Ref: ' . $reference;
$mailSent = @mail($recipient, $subject, implode("\r\n", $lines), implode("\r\n", $headers), '-f ' . $fromEmail);
if (!$mailSent) {
    $mailSent = @mail($recipient, $subject, implode("\r\n", $lines), implode("\r\n", $headers));
}
if (!$mailSent) {
    respond(503, ['success' => false, 'message' => 'We could not deliver your enquiry. Please try again or use a verified contact channel shown on the website.']);
}

respond(200, ['success' => true, 'reference' => $reference, 'message' => 'Your enquiry has been sent to KEDGE. Please keep this reference: ' . $reference]);
