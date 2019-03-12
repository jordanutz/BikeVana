select * from bikes join reviews on (bikes.id = reviews.bike_id) where bike_id = $1
