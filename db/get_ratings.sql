SELECT AVG(rating) AS average
FROM reviews
JOIN bikes ON bikes.id = reviews.bike_id
WHERE bike_id = $1;
