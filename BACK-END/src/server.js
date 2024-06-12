const fastify = require('fastify')({ logger: true });

// Plugins
fastify.register(require('./plugins/prisma'));
fastify.register(require('@fastify/jwt'), { secret: 'supersecret' });

// Rotas
fastify.register(require('./routes/auth'));
fastify.register(require('./routes/schedules'));
fastify.register(require('./routes/tasks'));

fastify.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err);
  }
});

fastify.get('/profile', { onRequest: fastify.authenticate }, async (request, reply) => {
  const userId = request.user.id
  console.log(userId);

  const user = await fastify.prisma.user.findUnique({
    where: { id: userId },
    include: { schedules: true, tasks: true }
  });
  reply.send({ user });
});

const start = async () => {
  try {
    await fastify.listen({
      port: 3000,
      host: '0.0.0.0',
    });
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
