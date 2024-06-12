const fp = require('fastify-plugin');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function prismaPlugin(fastify, opts) {
  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (fastify, done) => {
    await fastify.prisma.$disconnect();
    done();
  });
}

module.exports = fp(prismaPlugin);
