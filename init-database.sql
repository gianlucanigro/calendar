CREATE DATABASE IF NOT EXISTS calendar;

CREATE TABLE IF NOT EXISTS calendar.customers (
    customer_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (customer_id),
    INDEX (name)
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS calendar.booking (
    book_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NOT NULL,
    start DATETIME,
    end DATETIME,
PRIMARY KEY(book_id),
INDEX (customer_id),
FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
) ENGINE = INNODB;

INSERT INTO
    calendar.customers(name)
values
    ('Mario Rossi'),
    ('Giuseppe Verdi'),
    ('Carlo Bianchi');