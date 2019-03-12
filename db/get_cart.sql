SELECT * FROM order_items
JOIN orders ON order_items.order_id = orders.id
JOIN bikes ON order_items.bike_id = bikes.id
WHERE user_id = $1 AND order_id = $2 AND paid = false
