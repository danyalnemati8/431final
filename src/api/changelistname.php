<?php
// Fetch the incoming request data
$data = json_decode(file_get_contents('php://input'), true);
$listId = $data['listId'];
$newName = $data['name'];

// Path to your JSON file
$file = 'data.json';

// Read the current data from the JSON file
$json = json_decode(file_get_contents($file), true);

foreach ($json['lists'] as &$list) {
    if ($list['id'] === $listId) {
        $list['name'] = $newName;
        break;
    }
}

file_put_contents($file, json_encode($json));
echo json_encode(['success' => true, 'message' => 'List name updated successfully']);
?>
