select * from favorites
join bikevanausers on (bikevanausers.id = favorites.user_id)
join bikes on (bikes.id = favorites.bike_id)
where user_id = $1 and favorite = true;
