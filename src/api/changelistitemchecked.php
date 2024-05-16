<?php
// Read the input data
$data = json_decode(file_get_contents('php://input'), true);
$listId = $data['listId'];
$itemId = $data['itemId'];
$newCheckedStatus = $data['checked'];

$file = 'data.json';
$json = json_decode(file_get_contents($file), true);;

// Find the specified list by ID
foreach ($json['lists'] as &$list) {
    if ($list['id'] == $listId) {
        // Find the item by ID within the found list and update the checked status
        foreach ($list['items'] as &$item) {
            if ($item['id'] == $itemId) {
                $item['checked'] = $newCheckedStatus;
                break; // Exit the loop as the item is found and updated
            }
        }
        break; // Exit the loop as the list is found
    }
}

// Save the updated JSON data
file_put_contents($file, json_encode($json));
echo json_encode(['success' => true, 'message' => 'Item status updated successfully']);
?>
