const { ServiceBroker } = require("moleculer");

const broker = new ServiceBroker({
    cacher: {
        cacher: {
            type: "Memory",
            options: { ttl: 120 }
        }
    },
    created: async function (broker) {
        console.log("Broker created");
    }
});

broker.loadServices();


broker.start()

    .then(() => console.log("Broker with configured services started successfully"))
    .catch(err => console.error("Error starting broker with configured services", err));

