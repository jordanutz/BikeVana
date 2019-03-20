insert into orders
  (user_id, paid, date)
  values
  ($1, $2, $3)
  returning *;
