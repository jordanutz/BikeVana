select * from orders
join cart on cart.order_id = orders.id
join bikevanausers on bikevanausers.id = orders.user_id
join bikes on cart.bike_id = bikes.id
where user_id = 1 and paid = true
