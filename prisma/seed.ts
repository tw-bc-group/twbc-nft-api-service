import prisma from '../src/databases';

// users
const createUserFunc = prisma.users.create({
  data: {
    id: 1,
    email: 'adam.wong@thoughtworks.com',
    password: '$2b$10$m357GjxnEgACnJqfA3TBnuYhveGWSSKfn4Fz5uQUzDisEetCeU9HO',
  },
});

const createWalletsFunc = prisma.wallets.createMany({
  data: [
    {
      id: 1,
      keyName: '1',
      address: 'iaa1sudr3cs54rcvnlzrumur2m4kteljk7zm8vc9js',
      privKey: 'U2FsdGVkX1+Y99s1l2uOSkOWmMzKsM3tcNtJNVIb+vtgNaG2zFthkKLpCpqroZCZUVVYM1DfzF3JkQ/jRToB4iLHEvgoPND6aZHv8qEzhSoFrzJfeGRXXw62wopwWi3x',
    },
    {
      id: 2,
      keyName: 'tw',
      address: 'iaa1uhajlcjxtkzq7g6uey4hqvukru9n2t4nfxe3pr',
      privKey: 'U2FsdGVkX19E6TOUL8t1lKC7CB79BtIh3xxfH+QXsiOKNJORxGRC/wXBRS6PmBYi6pKgykf1I4KluQZ4UYtDXSB1V5w5hZ0jPDK5QXqE53xlCIOOU9b79LI3WnFbkdph',
    },
  ],
});

async function main() {
  console.log(`Start seeding ...`);
  const user = await createUserFunc;
  console.log(`Created user with id: ${user.id}`);
  const wallets = await createWalletsFunc;
  console.log(`Created wallets: ${wallets}`);
  console.log(`Seeding finished.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
