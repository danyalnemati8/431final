<?php
// Read the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'];

// Define the file path to the JSON file
$file = 'data.json';
// Read the file contents
$json = file_get_contents($file);
        
// Decode the JSON data
$lists = json_decode($json, true);

// Filter out the list with the specified id
$filteredLists = array_filter($lists['lists'], function($list) use ($id) {
    return $list['id'] !== $id;
});

// Update the lists in the JSON structure
$lists['lists'] = array_values($filteredLists);

// Write the updated JSON back to the file
file_put_contents($file, json_encode($lists));

// Respond with success
echo json_encode(['success' => true]);
?>
