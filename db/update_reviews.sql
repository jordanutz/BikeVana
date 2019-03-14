UPDATE Reviews SET title = $2, description = $3, rating = $4, pros = $5, cons = $6, best_uses = $7, user_id = $8, bike_id = $9 WHERE id = $1;
SELECT * FROM bikes JOIN reviews ON (bikes.id = reviews.bike_id) WHERE bike_id = $9;
