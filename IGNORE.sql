-- CONSULTAS QUE NORMALMENTE FARIA SEM YII2

SELECT * FROM products ORDER BY id DESC LIMIT 10;
UPDATE products SET `name` = 'Product Name' WHERE id = ?;
INSERT INT products (columns) VALUES (?);

-- RELATION
SELECT
	cp.id as relation_id,
	client.id as client_id,
	client.name as client_name,
	product.name as product_name,
	product.id as product_id
FROM customer_products cp
	LEFT JOIN clients client on client.id = cp.client
	LEFT JOIN products product ON product.id = cp.product

-- OR IN JSON WITH ALL PRODUCTS BUT 1 ROW BY CLIENT --
SELECT 
    client.id as client_id,
    client.name as client_name,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'relation_id', cp.id,
            'product_id', product.id,
            'product_name', product.name
        )
    ) as products
FROM customer_products cp
LEFT JOIN clients client ON client.id = cp.client
LEFT JOIN products product ON product.id = cp.product
GROUP BY client.id, client.name;