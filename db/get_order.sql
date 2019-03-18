SELECT * FROM orders
JOIN users ON orders.user_id = users.id
WHERE user_id = $1 AND paid = false
