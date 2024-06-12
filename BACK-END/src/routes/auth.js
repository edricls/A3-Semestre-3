async function authRoutes(fastify, options) {
  fastify.post('/signup', async (request, reply) => {
    const { email, password } = request.body;
    const user = await fastify.prisma.user.create({
      data: { email, password }
    });
    reply.send({ user });
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    const user = await fastify.prisma.user.findUnique({
      where: { email }
    });
    if (!user || user.password !== password) {
      return reply.status(401).send({ error: 'Invalid email or password' });
    }
    const token = fastify.jwt.sign({ id: user.id });
    reply.send({ token });
  });

}

module.exports = authRoutes;
