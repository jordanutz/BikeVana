insert into reviews
  (title, description, rating, date_posted, pros, cons, best_uses, user_id, bike_id)
  values
  ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *;
