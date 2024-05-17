<?php
// Read the raw POST data
$data = json_decode(file_get_contents('php://input'), true);
    
$listId = $data['listId'];
$itemName = $data['itemName'];
$created = $data['created'];

// Define the file path to the JSON file
$file = 'data.json';
 
// Read the file contents
$json = file_get_contents($file);
        
// Decode the JSON data
$lists = json_decode($json, true);

foreach ($lists['lists'] as &$list) {
    if ($list['id'] === $listId) {
        $newItem = [
            'id' => uniqid(),
            'name' => $itemName,
            'created' => $created,
            'checked' => false
        ];
        $list['items'][] = $newItem;
        break;
    }
}

file_put_contents($file, json_encode($lists));
echo json_encode(['success' => true]);
?>
