<?php
/*
|--------------------------------------------------------------------------
| CMS Database Upgrade Tool
|--------------------------------------------------------------------------
| Put this file in website root:
| upgrade-database.php
|
| Put latest database backup in website root:
| database.sql
|
| This script reads CREATE TABLE structure from database.sql.
| It creates missing tables and adds missing columns one by one.
| It does NOT import INSERT data.
|--------------------------------------------------------------------------
*/

error_reporting(E_ALL);
ini_set('display_errors', 1);
set_time_limit(0);
ignore_user_abort(true);


/*
|--------------------------------------------------------------------------
| Config path
|--------------------------------------------------------------------------
*/

$configFile = __DIR__ . '/assets/includes/config.php';

if (!file_exists($configFile)) {
    die('Config file not found: assets/includes/config.php');
}

require_once $configFile;



/*
|--------------------------------------------------------------------------
| Database SQL file
|--------------------------------------------------------------------------
*/

$sqlFile = __DIR__ . '/database.sql';

/*
|--------------------------------------------------------------------------
| Logs
|--------------------------------------------------------------------------
*/

$logs = [];

function addLog($type, $message)
{
    global $logs;

    $logs[] = [
        'type' => $type,
        'message' => $message
    ];
}

/*
|--------------------------------------------------------------------------
| Database connection detector
|--------------------------------------------------------------------------
*/

function getDatabaseConnection()
{
    /*
    |--------------------------------------------------------------------------
    | 1. Try existing mysqli connection objects from config.php
    |--------------------------------------------------------------------------
    */

    $possibleConnectionVars = [
        'mysqli',
        'conn',
        'db',
        'link',
        'sqlConnect',
        'sql_connect',
        'con',
        'connect',
        'connection',
        'db_connect',
        'GameMonetizeConnect',
        'Connect',
        'db_connection'
    ];

    foreach ($possibleConnectionVars as $varName) {
        if (isset($GLOBALS[$varName]) && $GLOBALS[$varName] instanceof mysqli) {
            return $GLOBALS[$varName];
        }
    }

    /*
    |--------------------------------------------------------------------------
    | 2. Try common constants
    |--------------------------------------------------------------------------
    */

    $constantSets = [
        ['DB_HOST', 'DB_USER', 'DB_PASS', 'DB_NAME'],
        ['DB_HOST', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE'],
        ['SQL_DB_HOST', 'SQL_DB_USER', 'SQL_DB_PASS', 'SQL_DB_NAME'],
        ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASS', 'MYSQL_DATABASE'],
        ['DATABASE_HOST', 'DATABASE_USER', 'DATABASE_PASS', 'DATABASE_NAME']
    ];

    foreach ($constantSets as $set) {
        [$hostConst, $userConst, $passConst, $nameConst] = $set;

        if (
            defined($hostConst) &&
            defined($userConst) &&
            defined($passConst) &&
            defined($nameConst)
        ) {
            return new mysqli(
                constant($hostConst),
                constant($userConst),
                constant($passConst),
                constant($nameConst)
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | 3. Try common variable names
    |--------------------------------------------------------------------------
    */

    $variableSets = [
        ['sql_db_host', 'sql_db_user', 'sql_db_pass', 'sql_db_name'],
        ['db_host', 'db_user', 'db_pass', 'db_name'],
        ['dbHost', 'dbUser', 'dbPass', 'dbName'],
        ['dbhost', 'dbuser', 'dbpass', 'dbname'],
        ['host', 'user', 'pass', 'name'],
        ['hostname', 'username', 'password', 'database'],
        ['servername', 'username', 'password', 'dbname'],
        ['mysql_host', 'mysql_user', 'mysql_pass', 'mysql_db'],
        ['mysql_host', 'mysql_username', 'mysql_password', 'mysql_database'],
        ['database_host', 'database_user', 'database_password', 'database_name'],
        ['sqlHost', 'sqlUser', 'sqlPass', 'sqlName']
    ];

    foreach ($variableSets as $set) {
        [$hostVar, $userVar, $passVar, $nameVar] = $set;

        if (
            isset($GLOBALS[$hostVar]) &&
            isset($GLOBALS[$userVar]) &&
            isset($GLOBALS[$passVar]) &&
            isset($GLOBALS[$nameVar])
        ) {
            return new mysqli(
                $GLOBALS[$hostVar],
                $GLOBALS[$userVar],
                $GLOBALS[$passVar],
                $GLOBALS[$nameVar]
            );
        }
    }

    /*
    |--------------------------------------------------------------------------
    | 4. Try config arrays
    |--------------------------------------------------------------------------
    */

$possibleArrayVars = [
    'dbGM',
    'config',
    'dbConfig',
    'database',
    'databaseConfig',
    'sql_config',
    'db_config'
];

    foreach ($possibleArrayVars as $arrayName) {
        if (!isset($GLOBALS[$arrayName]) || !is_array($GLOBALS[$arrayName])) {
            continue;
        }

        $array = $GLOBALS[$arrayName];

        $host = $array['host'] ?? $array['db_host'] ?? $array['hostname'] ?? null;
        $user = $array['user'] ?? $array['username'] ?? $array['db_user'] ?? null;
        $pass = $array['pass'] ?? $array['password'] ?? $array['db_pass'] ?? '';
        $name = $array['name'] ?? $array['database'] ?? $array['dbname'] ?? $array['db_name'] ?? null;

        if ($host && $user && $name) {
            return new mysqli($host, $user, $pass, $name);
        }
    }

    return null;
}

$mysqli = getDatabaseConnection();

if (!$mysqli || !($mysqli instanceof mysqli)) {
    die('Database connection not detected. Edit getDatabaseConnection() in this file and match your config.php variables.');
}

if ($mysqli->connect_error) {
    die('Database connection failed: ' . $mysqli->connect_error);
}

$mysqli->set_charset('utf8mb4');

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function tableExists($table)
{
    global $mysqli;

    $table = $mysqli->real_escape_string($table);
    $result = $mysqli->query("SHOW TABLES LIKE '{$table}'");

    return $result && $result->num_rows > 0;
}

function columnExists($table, $column)
{
    global $mysqli;

    if (!tableExists($table)) {
        return false;
    }

    $table = str_replace('`', '', $table);
    $column = $mysqli->real_escape_string($column);

    $result = $mysqli->query("SHOW COLUMNS FROM `{$table}` LIKE '{$column}'");

    return $result && $result->num_rows > 0;
}

function getExistingColumns($table)
{
    global $mysqli;

    $columns = [];

    if (!tableExists($table)) {
        return $columns;
    }

    $table = str_replace('`', '', $table);
    $result = $mysqli->query("SHOW COLUMNS FROM `{$table}`");

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $columns[] = $row['Field'];
        }
    }

    return $columns;
}

function runQuery($sql, $successMessage, $dryRun = true)
{
    global $mysqli;

    if ($dryRun) {
        addLog('plan', $successMessage);
        return true;
    }

    if ($mysqli->query($sql)) {
        addLog('success', $successMessage);
        return true;
    }

    addLog('error', $mysqli->error . ' | SQL: ' . $sql);
    return false;
}

/*
|--------------------------------------------------------------------------
| Parse CREATE TABLE blocks from database.sql
|--------------------------------------------------------------------------
*/

function parseCreateTablesFromSqlFile($filePath)
{
    $tables = [];

    if (!file_exists($filePath)) {
        return $tables;
    }

    $handle = fopen($filePath, 'r');

    if (!$handle) {
        return $tables;
    }

    $collecting = false;
    $currentSql = '';
    $currentTable = '';

    while (($line = fgets($handle)) !== false) {
        if (!$collecting) {
            if (preg_match('/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?`?([a-zA-Z0-9_]+)`?/i', $line, $match)) {
                $collecting = true;
                $currentTable = $match[1];
                $currentSql = $line;

                if (strpos($line, ';') !== false) {
                    $tables[$currentTable] = trim($currentSql);
                    $collecting = false;
                    $currentSql = '';
                    $currentTable = '';
                }
            }

            continue;
        }

        $currentSql .= $line;

        if (strpos($line, ';') !== false) {
            if (!empty($currentTable)) {
                $tables[$currentTable] = trim($currentSql);
            }

            $collecting = false;
            $currentSql = '';
            $currentTable = '';
        }
    }

    fclose($handle);

    return $tables;
}

/*
|--------------------------------------------------------------------------
| Extract column definitions from CREATE TABLE SQL
|--------------------------------------------------------------------------
*/

function extractColumnsFromCreateTable($createSql)
{
    $columns = [];

    $start = strpos($createSql, '(');
    $end = strrpos($createSql, ')');

    if ($start === false || $end === false || $end <= $start) {
        return $columns;
    }

    $inside = substr($createSql, $start + 1, $end - $start - 1);
    $lines = preg_split('/\r\n|\r|\n/', $inside);

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '') {
            continue;
        }

        $line = rtrim($line, ',');

        if (preg_match('/^`([^`]+)`\s+(.+)$/s', $line, $match)) {
            $columnName = $match[1];

            $columns[$columnName] = [
                'name' => $columnName,
                'definition' => $line
            ];
        }
    }

    return $columns;
}

function getPreviousExistingColumn($columns, $targetColumn, $existingColumns)
{
    $previous = null;

    foreach ($columns as $columnName => $data) {
        if ($columnName === $targetColumn) {
            return $previous;
        }

        if (in_array($columnName, $existingColumns, true)) {
            $previous = $columnName;
        }
    }

    return null;
}

function cleanCreateTableSql($sql)
{
    $sql = trim($sql);

    $sql = preg_replace('/^\s*DROP\s+TABLE\s+.*?;\s*/is', '', $sql);

    if (!preg_match('/CREATE\s+TABLE\s+IF\s+NOT\s+EXISTS/i', $sql)) {
        $sql = preg_replace('/CREATE\s+TABLE\s+/i', 'CREATE TABLE IF NOT EXISTS ', $sql, 1);
    }

    return $sql;
}

/*
|--------------------------------------------------------------------------
| Upgrade runner
|--------------------------------------------------------------------------
*/

function runDatabaseUpgrade($dryRun = true)
{
    global $sqlFile;

    if (!file_exists($sqlFile)) {
        addLog('error', 'database.sql not found in website root.');
        return;
    }

    addLog('info', 'Reading database.sql from root...');
    addLog('info', 'File size: ' . round(filesize($sqlFile) / 1024 / 1024, 2) . ' MB');

    $tables = parseCreateTablesFromSqlFile($sqlFile);

    if (empty($tables)) {
        addLog('error', 'No CREATE TABLE blocks found in database.sql.');
        return;
    }

    addLog('info', 'Found ' . count($tables) . ' table structures in database.sql.');

    foreach ($tables as $tableName => $createSql) {
        $tableName = str_replace('`', '', $tableName);

        addLog('info', 'Checking table: ' . $tableName);

        if (!tableExists($tableName)) {
            $safeCreateSql = cleanCreateTableSql($createSql);

            runQuery(
                $safeCreateSql,
                'Create missing table: ' . $tableName,
                $dryRun
            );

            continue;
        }

        addLog('exists', 'Table exists: ' . $tableName);

        $templateColumns = extractColumnsFromCreateTable($createSql);

        if (empty($templateColumns)) {
            addLog('warning', 'No columns detected for table: ' . $tableName);
            continue;
        }

        $existingColumns = getExistingColumns($tableName);

        foreach ($templateColumns as $columnName => $columnData) {
            if (in_array($columnName, $existingColumns, true)) {
                addLog('exists', 'Column exists: ' . $tableName . '.' . $columnName);
                continue;
            }

            $previousColumn = getPreviousExistingColumn($templateColumns, $columnName, $existingColumns);

            if ($previousColumn) {
                $alterSql = "ALTER TABLE `{$tableName}` ADD COLUMN {$columnData['definition']} AFTER `{$previousColumn}`";
                $message = "Add missing column: {$tableName}.{$columnName} AFTER {$previousColumn}";
            } else {
                $alterSql = "ALTER TABLE `{$tableName}` ADD COLUMN {$columnData['definition']} FIRST";
                $message = "Add missing column: {$tableName}.{$columnName} FIRST";
            }

            if (runQuery($alterSql, $message, $dryRun)) {
                $existingColumns[] = $columnName;
            }
        }
    }

    addLog('success', $dryRun ? 'Analyze finished. No database changes were made.' : 'Upgrade finished.');
}

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

$action = $_POST['action'] ?? '';

if ($action === 'analyze') {
    runDatabaseUpgrade(true);
}

if ($action === 'upgrade') {
    runDatabaseUpgrade(false);
}

$fileFound = file_exists($sqlFile);
$fileSize = $fileFound ? round(filesize($sqlFile) / 1024 / 1024, 2) . ' MB' : 'Not found';

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Database Upgrade Tool</title>
    <style>
        body {
            margin: 0;
            background: #181925;
            color: #e9e9f3;
            font-family: Arial, sans-serif;
            padding: 30px;
        }

        .wrap {
            max-width: 1100px;
            margin: 0 auto;
        }

        .box {
            background: #212233;
            border: 1px solid #34364a;
            border-radius: 12px;
            padding: 22px;
            margin-bottom: 20px;
        }

        h1 {
            margin-top: 0;
            color: #ffd400;
        }

        .status {
            display: grid;
            gap: 10px;
            margin: 15px 0;
        }

        .status-row {
            background: #2c2e3f;
            border: 1px solid #3d4057;
            padding: 12px;
            border-radius: 8px;
        }

        .warning {
            background: #3a2b16;
            border: 1px solid #d39b27;
            color: #ffdca2;
            padding: 14px;
            border-radius: 8px;
            line-height: 1.5;
        }

        .buttons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin-top: 18px;
        }

        button {
            border: 0;
            color: #fff;
            padding: 12px 18px;
            border-radius: 7px;
            cursor: pointer;
            font-weight: bold;
            font-size: 15px;
        }

        .btn-analyze {
            background: #4b63d8;
        }

        .btn-upgrade {
            background: #249b48;
        }

        .btn-upgrade:hover {
            background: #1e843d;
        }

        .btn-analyze:hover {
            background: #4055bd;
        }

        .console {
            background: #10111a;
            border: 1px solid #303247;
            border-radius: 10px;
            padding: 15px;
            max-height: 620px;
            overflow: auto;
            font-family: Consolas, monospace;
            font-size: 14px;
            line-height: 1.55;
        }

        .log {
            padding: 6px 8px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            white-space: pre-wrap;
        }

        .info {
            color: #9fc7ff;
        }

        .exists {
            color: #b7bdcc;
        }

        .plan {
            color: #ffd166;
        }

        .success {
            color: #4ee07a;
        }

        .warning-log {
            color: #ffbc66;
        }

        .error {
            color: #ff6b6b;
        }

        code {
            background: #11131e;
            padding: 2px 5px;
            border-radius: 4px;
            color: #ffd400;
        }
    </style>
</head>
<body>

<div class="wrap">

    <div class="box">
        <h1>Database Upgrade Tool</h1>

        <div class="warning">
            <strong>Important:</strong> Make a full database backup before running upgrade.
            This script reads <code>database.sql</code> from root, checks missing CMS tables and columns,
            then adds only missing structure. It does not import games, users, blogs, or rows.
        </div>

        <div class="status">
            <div class="status-row">
                Database SQL file:
                <?php if ($fileFound): ?>
                    ✅ Found <code>database.sql</code>
                <?php else: ?>
                    ❌ Missing <code>database.sql</code>
                <?php endif; ?>
            </div>

            <div class="status-row">
                File size: <code><?php echo htmlspecialchars($fileSize); ?></code>
            </div>

            <div class="status-row">
                Current database connection: ✅ Connected
            </div>
        </div>

        <?php if ($fileFound): ?>
    <form method="post" class="buttons">
        <button class="btn-analyze" type="submit" name="action" value="analyze">
            Analyze Only
        </button>

        <button class="btn-upgrade" type="submit" name="action" value="upgrade" onclick="return confirm('Make sure you have a backup. Run database upgrade now?');">
            Run Upgrade
        </button>
    </form>
<?php else: ?>
    <div class="warning">
        Upload <code>database.sql</code> to the website root first. Buttons are disabled because there is nothing to upgrade from.
    </div>
<?php endif; ?>
    </div>

    <?php if (!empty($logs)): ?>
        <div class="box">
            <h2>Console</h2>

            <div class="console">
                <?php foreach ($logs as $log): ?>
                    <?php
                    $class = $log['type'];

                    if ($class === 'warning') {
                        $class = 'warning-log';
                    }

                    $icon = '•';

                    if ($log['type'] === 'info') {
                        $icon = 'ℹ️';
                    } elseif ($log['type'] === 'exists') {
                        $icon = '✅';
                    } elseif ($log['type'] === 'plan') {
                        $icon = '➕';
                    } elseif ($log['type'] === 'success') {
                        $icon = '✅';
                    } elseif ($log['type'] === 'warning') {
                        $icon = '⚠️';
                    } elseif ($log['type'] === 'error') {
                        $icon = '❌';
                    }
                    ?>

                    <div class="log <?php echo htmlspecialchars($class); ?>">
                        <?php echo $icon . ' ' . htmlspecialchars($log['message']); ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    <?php endif; ?>

</div>

</body>
</html>