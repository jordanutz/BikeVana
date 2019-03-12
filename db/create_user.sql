insert into bikevanausers
(auth0_id, username, email, photo)
values
($1, $2, $3, $4)
returning *;
