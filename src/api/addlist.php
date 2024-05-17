<?php
$data = json_decode(file_get_contents('php://input'), true);
$listName = $data['name'];
$created = $data['created'];

$file = 'data.json';
$json = json_decode(file_get_contents($file), true);

$newList = [
    'id' => uniqid(),
    'name' => $listName,
    'created' => $created,
    'items' => []
];

$json['lists'][] = $newList;

file_put_contents($file, json_encode($json));

echo json_encode(['success' => true]);
?>
