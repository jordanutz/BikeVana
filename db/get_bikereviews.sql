select * from reviews join bikes on (bikes.id = reviews.bike_id) where bike_id = $1
