async function taskRoutes(fastify, options) {
  fastify.post('/tasks', { preHandler: fastify.authenticate }, async (request, reply) => {
    const { title, completed } = request.body;
    const task = await fastify.prisma.task.create({
      data: {
        title,
        completed,
        user: { connect: { id: request.user.id } }
      }
    });
    reply.send({ task });
  });

  fastify.get('/tasks', { preHandler: fastify.authenticate }, async (request, reply) => {
    const tasks = await fastify.prisma.task.findMany({
      where: { userId: request.user.id }
    });
    reply.send({ tasks });
  });
}

module.exports = taskRoutes;
