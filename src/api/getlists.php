<?php
// Define the file path to the JSON file
$file = 'data.json';

// Check if the file exists
if (file_exists($file)) {
    // Read the file contents
    $json = file_get_contents($file);
    
    // Decode the JSON data
    $data = json_decode($json, true);
    
    // Return the lists as a JSON response
    echo json_encode($data['lists']);
} else {
    // Return an empty array if the file does not exist
    echo json_encode([]);
}
?>