update Reviews set title = $1, description = $2, rating = $3, pros = $4, cons = $5, best_uses = $6, date_posted = $7 where id = $8 and user_id = $9;
