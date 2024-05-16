<?php
// Read the input data
$data = json_decode(file_get_contents('php://input'), true);
$listId = $data['listId'];
$itemId = $data['itemId'];

$file = 'data.json';
$json = json_decode(file_get_contents($file), true);

// Find the specified list by ID
foreach ($json['lists'] as &$list) {
    if ($list['id'] == $listId) {
        // Find and remove the item by ID within the found list
        foreach ($list['items'] as $key => $item) {
            if ($item['id'] == $itemId) {
                unset($list['items'][$key]);
                break; // Exit the loop as the item is found and removed
            }
        }
        break; // Exit the loop as the list is found
    }
}

// Save the updated JSON data
file_put_contents($file, json_encode($json));
echo json_encode(['success' => true, 'message' => 'Item deleted successfully']);
?>
