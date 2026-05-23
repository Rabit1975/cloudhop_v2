<?php
header('Content-Type: application/json; charset=utf-8');

$SECRET_KEY = 'r@Jos1_p91r`t&Sq';

$rootPath = dirname(__DIR__, 3);
$configFile = $rootPath . '/assets/includes/config.php';

if (!file_exists($configFile)) {
	echo json_encode(['ok' => false, 'error' => 'Config file not found']);
	exit;
}

require_once $configFile;

function syncFail($msg) {
	echo json_encode(['ok' => false, 'error' => $msg]);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	syncFail('Bad request');
}

$key = $_POST['key'] ?? '';

if (!hash_equals($SECRET_KEY, $key)) {
	syncFail('Bad key');
}

$type = $_POST['type'] ?? '';
$id = intval($_POST['id'] ?? 0);
$html = trim($_POST['html'] ?? '');

if (!in_array($type, ['game', 'tag'], true)) syncFail('Bad type');
if ($id <= 0) syncFail('Bad ID');
if ($html === '') syncFail('Missing HTML content');

$html = strip_tags($html, '<p><a><strong><b><em><i><h3><h4><br><ul><ol><li>');

$db = new mysqli($dbGM['host'], $dbGM['user'], $dbGM['pass'], $dbGM['name']);

if ($db->connect_error) {
	syncFail('DB connection failed');
}

$db->set_charset('utf8mb4');

function columnExists($db, $table, $column) {
	$table = $db->real_escape_string($table);
	$column = $db->real_escape_string($column);

	$res = $db->query("SHOW COLUMNS FROM `$table` LIKE '$column'");
	return ($res && $res->num_rows > 0);
}

if ($type === 'game') {
	$table = 'gm_games';
	$idCol = columnExists($db, $table, 'game_id') ? 'game_id' : 'id';
	$textCol = 'description';
} else {
	$table = 'gm_tags';
	$idCol = columnExists($db, $table, 'tag_id') ? 'tag_id' : 'id';
	$textCol = 'footer_description';
}

if (!columnExists($db, $table, $textCol)) {
	syncFail("Missing column: $table.$textCol");
}

$stmt = $db->prepare("SELECT `$textCol` FROM `$table` WHERE `$idCol` = ? LIMIT 1");
$stmt->bind_param('i', $id);
$stmt->execute();
$res = $stmt->get_result();

if (!$row = $res->fetch_assoc()) {
	syncFail('ID not found');
}

$oldText = $row[$textCol] ?? '';

if (strpos($oldText, $html) !== false) {
	echo json_encode([
		'ok' => true,
		'skipped' => true,
		'message' => 'HTML content already exists',
		'type' => $type,
		'id' => $id
	]);
	exit;
}

$newText = trim($oldText . "\n\n" . $html);

$stmt = $db->prepare("UPDATE `$table` SET `$textCol` = ? WHERE `$idCol` = ? LIMIT 1");
$stmt->bind_param('si', $newText, $id);

if (!$stmt->execute()) {
	syncFail('Update failed');
}

echo json_encode([
	'ok' => true,
	'message' => 'Backlink inserted',
	'type' => $type,
	'id' => $id,
	'table' => $table,
	'column' => $textCol
]);