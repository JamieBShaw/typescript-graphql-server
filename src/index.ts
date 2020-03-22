import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";
import { createConnection } from "typeorm";

@Resolver()
class HelloResolver {
	@Query(() => String, {})
	async hello() {
		return "Hello World";
	}
}

const main = async () => {
	try {
		await createConnection();
	} catch (err) {
		console.log(err);
	}

	const schema = await buildSchema({
		resolvers: [HelloResolver]
	});

	const apolloServer = new ApolloServer({ schema });

	const app = express();

	apolloServer.applyMiddleware({ app });

	app.listen(4000, () => {
		console.log("SERVER STATRED ON PORT 4000/graphql");
	});
};

main();
