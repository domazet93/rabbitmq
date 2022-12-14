Just scratching a surface of RabbitMQ and messaging concepts using amqplib nodeJS client and RabbitMQ on Docker.

### Prerequisites
```
Node >=18.3
```
### Installl
```
yarn install
```

### Run RabbitMQ Server
```
docker run --name rabbitmq -p 5672:5672 rabbitmq
```

### Send a message

Publish a single message to RabbitMQ Server
```
yarn run publish --message '{"id": 1 }'
```

### Consume a message

Consume messages from queue
```
yarn run consumer
```