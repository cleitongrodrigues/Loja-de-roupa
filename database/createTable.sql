CREATE TABLE IF NOT EXISTS Produtos(
Cod_Produto INT NOT NULL auto_increment,
Nome_Produto VARCHAR(50),
Valor_Produto DOUBLE,
Img_Produto VARCHAR(50),
PRIMARY KEY (Cod_Produto)
);