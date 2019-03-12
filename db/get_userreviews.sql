SELECT * FROM reviews
JOIN bikevanausers
ON (bikevanausers.id = reviews.user_id)
WHERE user_id = 1
