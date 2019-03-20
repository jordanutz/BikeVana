SELECT cart.id as cart_id, * FROM cart
JOIN orders ON cart.order_id = orders.id
JOIN bikes ON cart.bike_id = bikes.id
WHERE user_id = $1 AND order_id = $2 AND paid = false
