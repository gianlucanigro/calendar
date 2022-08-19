# calendar

avvio container docker

docker run --detach --name=calendar-mysql --env="MYSQL_ROOT_PASSWORD=pippo123" --publish 6603:3306 --volume=/Users/gianlucanigro/corsi_firenze/calendar/storage/docker/mysql-data:/var/lib/mysql mysql:latest

CREATE TABLE customer (
                          customer_id INT NOT NULL,
                          name VARCHAR(50) NOT NULL,
                          PRIMARY KEY (customer_id),
                      INDEX (name)
)   ENGINE=INNODB;

CREATE TABLE booking (
                               book_id INT NOT NULL AUTO_INCREMENT,
                               customer_id INT NOT NULL,
                               date DATETIME,
                               PRIMARY KEY(book_id),
                               INDEX (customer_id),
                               FOREIGN KEY (customer_id)
                                   REFERENCES customer(customer_id)
)   ENGINE=INNODB;