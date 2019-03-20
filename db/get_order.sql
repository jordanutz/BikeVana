select * from bikevanausers
join orders on orders.user_id = bikevanausers.id
where user_id = $1 and paid = false
