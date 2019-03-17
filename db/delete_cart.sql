DELETE FROM cart WHERE id = $1;
SELECT cart.id as cart_id, * FROM cart
JOIN orders ON cart.order_id = orders.id
JOIN bikes ON cart.bike_id = bikes.id
WHERE user_id = $2 AND order_id = $3 AND paid = false;
