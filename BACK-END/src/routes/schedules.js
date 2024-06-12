async function scheduleRoutes(fastify, options) {
  fastify.post('/schedules', { preHandler: fastify.authenticate }, async (request, reply) => {
    const { title, date, sharedWith } = request.body;
    const schedule = await fastify.prisma.schedule.create({
      data: {
        title,
        date: new Date(date),
        user: { connect: { id: request.user.id } },
        sharedWith: {
          connect: sharedWith.map(id => ({ id }))
        }
      }
    });
    reply.send({ schedule });
  });

  fastify.get('/schedules', { preHandler: fastify.authenticate }, async (request, reply) => {
    const schedules = await fastify.prisma.schedule.findMany({
      where: { userId: request.user.id },
      include: { sharedWith: true }
    });
    reply.send({ schedules });
  });
}

module.exports = scheduleRoutes;
