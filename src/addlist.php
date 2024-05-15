<?php
$data = json_decode(file_get_contents('php://input'), true);
$listName = $data['name'];

$file = 'data.json';
$json = json_decode(file_get_contents($file), true);

$newList = [
    'id' => uniqid(),
    'name' => $listName,
    'items' => []
];

$json['lists'][] = $newList;

file_put_contents($file, json_encode($json));

echo json_encode(['success' => true]);
?>
