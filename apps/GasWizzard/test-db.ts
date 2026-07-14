import "dotenv/config";
import { prisma } from "./lib/prisma";

async function main() {
    console.time("Prisma query");

    const user = await prisma.user.findFirst();

    console.timeEnd("Prisma query");
    console.log(user);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });