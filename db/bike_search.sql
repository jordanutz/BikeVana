SELECT * FROM bikes WHERE name ILIKE CONCAT('%', $1, '%') AND brand ILIKE CONCAT('%', $2, '%') AND category ILIKE CONCAT('%', $3, '%');
